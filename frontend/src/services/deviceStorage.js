import { AsyncStorage } from '@react-native-async-storage/async-storage';

const deviceStorage = {
    
    async saveJWT(key, value) {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (err) {
            console.log(err.message);
        }
    },

    async getJWT(key) {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                return value;
            }
        } catch (err) {
            console.log(err.message);
        }
    }
};

export default deviceStorage;