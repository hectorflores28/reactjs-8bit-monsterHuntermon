import { QUEST_TYPES, QUEST_STATUS, MAIN_QUESTS, SIDE_QUESTS, DAILY_CHALLENGES, QUEST_REWARDS } from '../config/questConfig';

export class QuestManager {
  constructor() {
    this.activeQuests = new Map();
    this.completedQuests = new Set();
    this.dailyQuests = new Map();
    this.lastDailyReset = Date.now();
  }

  initializeQuests() {
    // Cargar misiones principales disponibles
    Object.entries(MAIN_QUESTS).forEach(([key, quest]) => {
      if (!this.completedQuests.has(quest.id) && this.checkQuestRequirements(quest)) {
        this.activeQuests.set(quest.id, {
          ...quest,
          type: QUEST_TYPES.MAIN,
          status: QUEST_STATUS.NOT_STARTED,
          progress: this.initializeQuestProgress(quest)
        });
      }
    });

    // Cargar misiones secundarias disponibles
    Object.entries(SIDE_QUESTS).forEach(([key, quest]) => {
      if (!this.completedQuests.has(quest.id) && this.checkQuestRequirements(quest)) {
        this.activeQuests.set(quest.id, {
          ...quest,
          type: QUEST_TYPES.SIDE,
          status: QUEST_STATUS.NOT_STARTED,
          progress: this.initializeQuestProgress(quest)
        });
      }
    });

    this.resetDailyQuests();
  }

  initializeQuestProgress(quest) {
    return quest.objectives.map(objective => ({
      ...objective,
      progress: 0,
      completed: false
    }));
  }

  checkQuestRequirements(quest) {
    if (!quest.requirements) return true;

    const { level, completedQuests, items } = quest.requirements;

    // Verificar nivel requerido
    if (level && this.playerLevel < level) return false;

    // Verificar misiones previas completadas
    if (completedQuests) {
      if (!completedQuests.every(questId => this.completedQuests.has(questId))) {
        return false;
      }
    }

    // Verificar items requeridos
    if (items) {
      if (!items.every(item => this.playerInventory.has(item))) {
        return false;
      }
    }

    return true;
  }

  startQuest(questId) {
    const quest = this.activeQuests.get(questId);
    if (!quest || quest.status !== QUEST_STATUS.NOT_STARTED) return false;

    quest.status = QUEST_STATUS.IN_PROGRESS;
    quest.startTime = Date.now();
    this.activeQuests.set(questId, quest);

    return true;
  }

  updateQuestProgress(questId, objectiveId, progress) {
    const quest = this.activeQuests.get(questId);
    if (!quest || quest.status !== QUEST_STATUS.IN_PROGRESS) return false;

    const objective = quest.objectives.find(obj => obj.id === objectiveId);
    if (!objective) return false;

    objective.progress = Math.min(objective.count, objective.progress + progress);
    objective.completed = objective.progress >= objective.count;

    // Verificar si todos los objetivos están completados
    if (quest.objectives.every(obj => obj.completed)) {
      this.completeQuest(questId);
    }

    return true;
  }

  completeQuest(questId) {
    const quest = this.activeQuests.get(questId);
    if (!quest || quest.status !== QUEST_STATUS.IN_PROGRESS) return false;

    const performance = this.calculateQuestPerformance(quest);
    const rank = this.calculateQuestRank(performance);
    const rewards = this.calculateQuestRewards(quest, rank);

    quest.status = QUEST_STATUS.COMPLETED;
    quest.completionTime = Date.now();
    quest.rank = rank;
    quest.finalRewards = rewards;

    this.completedQuests.add(questId);
    this.activeQuests.delete(questId);

    // Desbloquear siguiente misión si existe
    if (quest.nextQuest) {
      const nextQuest = MAIN_QUESTS[quest.nextQuest];
      if (nextQuest && this.checkQuestRequirements(nextQuest)) {
        this.activeQuests.set(nextQuest.id, {
          ...nextQuest,
          type: QUEST_TYPES.MAIN,
          status: QUEST_STATUS.NOT_STARTED,
          progress: this.initializeQuestProgress(nextQuest)
        });
      }
    }

    return rewards;
  }

  abandonQuest(questId) {
    const quest = this.activeQuests.get(questId);
    if (!quest || quest.status !== QUEST_STATUS.IN_PROGRESS) return false;

    quest.status = QUEST_STATUS.FAILED;
    this.activeQuests.delete(questId);

    return true;
  }

  calculateQuestPerformance(quest) {
    const timeTaken = Date.now() - quest.startTime;
    const perfectCompletion = quest.objectives.every(obj => obj.progress >= obj.count);
    const efficiency = quest.timeLimit ? Math.min(1, quest.timeLimit / timeTaken) : 1;

    return {
      timeTaken,
      perfectCompletion,
      efficiency
    };
  }

  calculateQuestRank(performance) {
    const { perfectCompletion, efficiency } = performance;

    if (perfectCompletion && efficiency >= 0.9) return 'S_RANK';
    if (perfectCompletion && efficiency >= 0.7) return 'A_RANK';
    if (efficiency >= 0.5) return 'B_RANK';
    return 'C_RANK';
  }

  calculateQuestRewards(quest, rank) {
    const baseRewards = quest.reward;
    const rankBonus = QUEST_REWARDS[rank];

    return {
      experience: Math.floor(baseRewards.experience * rankBonus.multiplier),
      gold: Math.floor(baseRewards.gold * rankBonus.multiplier),
      items: [...baseRewards.items, ...rankBonus.bonus_items]
    };
  }

  resetDailyQuests() {
    const now = Date.now();
    const dayInMs = 24 * 60 * 60 * 1000;

    if (now - this.lastDailyReset >= dayInMs) {
      this.dailyQuests.clear();

      Object.entries(DAILY_CHALLENGES).forEach(([key, quest]) => {
        this.dailyQuests.set(quest.id, {
          ...quest,
          type: QUEST_TYPES.DAILY,
          status: QUEST_STATUS.NOT_STARTED,
          progress: this.initializeQuestProgress(quest)
        });
      });

      this.lastDailyReset = now;
    }
  }

  getActiveQuests() {
    return Array.from(this.activeQuests.values());
  }

  getDailyQuests() {
    this.resetDailyQuests();
    return Array.from(this.dailyQuests.values());
  }

  getCompletedQuests() {
    return Array.from(this.completedQuests);
  }

  getQuestById(questId) {
    return this.activeQuests.get(questId) || this.dailyQuests.get(questId);
  }

  // Eventos de combate
  onMonsterDefeated(monsterId) {
    this.updateQuestsForEvent('DEFEAT_MONSTER', { monsterId });
  }

  onComboPerformed(comboType) {
    this.updateQuestsForEvent('PERFECT_COMBO', { comboType });
  }

  onItemCollected(itemId) {
    this.updateQuestsForEvent('COLLECT_ITEM', { itemId });
  }

  updateQuestsForEvent(eventType, data) {
    [...this.activeQuests.values(), ...this.dailyQuests.values()]
      .filter(quest => quest.status === QUEST_STATUS.IN_PROGRESS)
      .forEach(quest => {
        quest.objectives.forEach(objective => {
          if (objective.type === eventType) {
            switch (eventType) {
              case 'DEFEAT_MONSTER':
                if (objective.target === data.monsterId) {
                  this.updateQuestProgress(quest.id, objective.id, 1);
                }
                break;
              case 'PERFECT_COMBO':
                this.updateQuestProgress(quest.id, objective.id, 1);
                break;
              case 'COLLECT_ITEM':
                if (objective.target === data.itemId) {
                  this.updateQuestProgress(quest.id, objective.id, 1);
                }
                break;
            }
          }
        });
      });
  }
} 