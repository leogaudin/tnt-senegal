import React, {useContext} from 'react';
import {View} from 'react-native';
import styles from '../../styles';
import RNRestart from 'react-native-restart';
import AppContext from '../../context/AppContext';
import { Text, Button } from 'react-native-paper';

export default function AskPermissions() {
  const {hasCameraPermissions, hasLocationPermissions} = useContext(AppContext);

  if (!(hasCameraPermissions && hasLocationPermissions))
    return (
        <View
          style={[
            styles.view,
            {
              backgroundColor: 'whitesmoke',
              padding: 30,
            },
          ]}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
            }}>
            Cette application a besoin d'accéder à la caméra et à la localisation pour démarrer. Veuillez autoriser l'accès aux deux et redémarrer si cette page s'affiche toujours.
          </Text>
          <Button
            style={{marginVertical: 15}}
            mode='contained'
            onPress={() => RNRestart.restart()}>
              Check permissions again
          </Button>
        </View>
    );
}
