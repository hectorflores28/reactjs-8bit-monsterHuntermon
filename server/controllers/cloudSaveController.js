const UserData = require('../models/UserData');

exports.saveGameData = async (req, res) => {
  try {
    const { userId, gameData } = req.body;
    
    const userData = await UserData.findOneAndUpdate(
      { userId },
      { 
        ...gameData,
        lastSync: new Date()
      },
      { 
        upsert: true,
        new: true
      }
    );

    res.status(200).json({
      success: true,
      message: 'Datos guardados exitosamente',
      data: userData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al guardar los datos',
      error: error.message
    });
  }
};

exports.loadGameData = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const userData = await UserData.findOne({ userId });
    
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: 'No se encontraron datos para este usuario'
      });
    }

    res.status(200).json({
      success: true,
      data: userData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al cargar los datos',
      error: error.message
    });
  }
};

exports.syncGameData = async (req, res) => {
  try {
    const { userId, localData } = req.body;
    
    const cloudData = await UserData.findOne({ userId });
    
    if (!cloudData) {
      // Si no hay datos en la nube, guardar los datos locales
      const newUserData = new UserData({
        userId,
        ...localData,
        lastSync: new Date()
      });
      await newUserData.save();
      
      return res.status(200).json({
        success: true,
        message: 'Datos sincronizados exitosamente',
        data: newUserData
      });
    }

    // Comparar timestamps para determinar qué datos son más recientes
    const localTimestamp = new Date(localData.lastSync);
    const cloudTimestamp = new Date(cloudData.lastSync);

    if (localTimestamp > cloudTimestamp) {
      // Los datos locales son más recientes
      const updatedData = await UserData.findOneAndUpdate(
        { userId },
        { 
          ...localData,
          lastSync: new Date()
        },
        { new: true }
      );
      
      return res.status(200).json({
        success: true,
        message: 'Datos sincronizados exitosamente',
        data: updatedData
      });
    } else {
      // Los datos en la nube son más recientes
      return res.status(200).json({
        success: true,
        message: 'Datos sincronizados exitosamente',
        data: cloudData
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al sincronizar los datos',
      error: error.message
    });
  }
}; 