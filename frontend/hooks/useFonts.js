import * as Font from "expo-font";
 
export default useFonts = async () =>
  await Font.loadAsync({
    'HelveticaNeue-Medium': require('./assets/fonts/HelveticaNeue-Medium.otf'),
  });