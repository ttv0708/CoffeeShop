import { Redirect } from "expo-router";
import * as FileSystem from 'expo-file-system';
import { useEffect } from "react";

export default function App() {
    const defaultProfile = {
        fullName: "Anderson",
        phoneNumber: "+60134589525",
        email: "Anderson@email.com",
        address: "3 Addersion Court\nChino Hills, HO56824, United State",
        rewardPoints: 2750,
        loyaltyCnt: 4,
      };

    const initializeAppFiles = async () => {
        try {
        
          const filesToInitialize = [
            { name: 'my-cart.txt', defaultContent: '[]' },
            { name: 'profile.txt', defaultContent: JSON.stringify(defaultProfile) },
            { name: 'my-order-on-going.txt', defaultContent: '[]' },
            { name: 'my-history-order.txt', defaultContent: '[]' }
          ];
      
          for (const file of filesToInitialize) {
            const fileUri = FileSystem.documentDirectory + file.name;
            const fileInfo = await FileSystem.getInfoAsync(fileUri);
            
            if (!fileInfo.exists) {
              await FileSystem.writeAsStringAsync(
                fileUri,
                file.defaultContent,
                { encoding: FileSystem.EncodingType.UTF8 }
              );
            }
          }
          //console.log('App files initialization complete');
        } catch (error) {
          console.error('Error initializing app files:', error);
        }
      };

    useEffect(() => {
        initializeAppFiles();
      }, []);

    return <Redirect href='./(tabs)/HomeScreen' />
}