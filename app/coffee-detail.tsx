import { router, useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import * as FileSystem from 'expo-file-system';

import Americano from '@/assets/svg/americano';
import Cappuccino from '@/assets/svg/cappuccino';
import Mocha from '@/assets/svg/mocha';
import FlatWhite from '@/assets/svg/flatWhite';
import BackIcon from '@/assets/svg/backIcon';
import BuyIcon from '@/assets/svg/buyIcon';
import HotIcon from '@/assets/svg/hotIcon';
import IcedIcon from '@/assets/svg/icedIcon';
import SizeSmallIcon from '@/assets/svg/sizeSmallIcon';
import SizeMediumIcon from '@/assets/svg/sizeMediumIcon';
import SizeLargeIcon from '@/assets/svg/sizeLargeIcon';
import OneThirdIcedIcon from '@/assets/svg/oneThirdIcedIcon';
import TwoThirdIcedIcon from '@/assets/svg/twoThirdIcedIcon';
import FullIcedIcon from '@/assets/svg/fullIcedIcon';

export default function CoffeeDetail() {
    const { name } = useLocalSearchParams(); // Nhận dữ liệu từ query params
    const router = useRouter();

    const coffeeList = [
      { name: "Americano", icon: <Americano /> },
      { name: "Cappuccino", icon: <Cappuccino /> },
      { name: "Mocha", icon: <Mocha /> },
      { name: "Flat White", icon: <FlatWhite /> }
    ];

    const [count, setCount] = useState(1);
    const increaseCount = () => setCount(count + 1);
    const decreaseCount = () => count > 1 && setCount(count - 1);

    const [shot, setShot] = useState('single');
    const [select, setSelect] = useState('hot');
    const [size, setSize] = useState('medium');
    const [ice, setIce] = useState('full ice');

    const price = 3;

    const addToCart = async () => {
      const coffeeDetails = {
          name,
          count,
          shot,
          select,
          size,
          ice,
          price: (count * price).toFixed(2),
      };

      const fileUri = FileSystem.documentDirectory + 'my-cart.txt';

      try {
          // Đọc nội dung hiện tại của file
          let fileContent = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 });
          let cart = fileContent ? JSON.parse(fileContent) : [];

          // Kiểm tra xem coffee đã tồn tại trong danh sách hay chưa
          const existingCoffeeIndex = cart.findIndex((item: { name: string | string[]; shot: string; select: string; size: string; ice: string; }) =>
              item.name === coffeeDetails.name &&
              item.shot === coffeeDetails.shot &&
              item.select === coffeeDetails.select &&
              item.size === coffeeDetails.size &&
              item.ice === coffeeDetails.ice
          );

          if (existingCoffeeIndex !== -1) {
              // Nếu tồn tại, tăng số lượng
              cart[existingCoffeeIndex].count += coffeeDetails.count;
              cart[existingCoffeeIndex].price = (cart[existingCoffeeIndex].count * price).toFixed(2);
          } else {
              // Nếu không tồn tại, thêm coffee mới vào danh sách
              cart.push(coffeeDetails);
          }

          // Ghi lại danh sách vào file
          await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(cart), { encoding: FileSystem.EncodingType.UTF8 });
          // console.log('Coffee details saved to my-cart.txt');
          // console.log('File saved at:', fileUri);
          router.push('/my-cart');
      } catch (error) {
          console.error('Error saving coffee details:', error);
      }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <BackIcon />
                </TouchableOpacity>
                <Text style={styles.title}>Details</Text>
                <TouchableOpacity onPress={() => router.back()}>
                    <BuyIcon />
                </TouchableOpacity>
            </View>
            <View>
                {coffeeList.map((item, index) => (
                    item.name === name && (
                        <View key={index} style={styles.coffeeItem}>
                            {item.icon}
                        </View>
                    )
                ))}
            </View>
            <View>
                <View style={styles.option}>
                    <Text>{name}</Text>
                    <View style={styles.cnt}>
                      <TouchableOpacity onPress={decreaseCount}>
                        <Text style={styles.buttonCnt}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.buttonCnt}>{count}</Text>
                      <TouchableOpacity onPress={increaseCount}>
                        <Text style={styles.buttonCnt }>+</Text>
                      </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.line}></View>
            <View>
              <View style={styles.option}>
                <Text>Shot</Text>
                <View style={styles.shotContainer}>
                  <TouchableOpacity onPress={() => setShot('single')}>
                    <Text style={[styles.button, shot === 'single' && styles.selectedShot]}>Single</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setShot('double')}>
                    <Text style={[styles.button, shot === 'double' && styles.selectedShot]}>Double</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.line}></View>
            <View>
                <View style={styles.option}>
                    <Text>Select</Text>
                    <View style={styles.iconContainer}>
                      <TouchableOpacity onPress={() => setSelect('hot')}>
                        <HotIcon style={[styles.icon, select === 'hot' && styles.selectedIcon]}/>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setSelect('iced')} >
                        <IcedIcon style={[styles.icon, select === 'iced' && styles.selectedIcon]}/>
                      </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.line}></View>
            <View>
                <View style={styles.option}>
                    <Text>Size</Text>
                    <View style={styles.iconContainer}>
                      <TouchableOpacity onPress={() => setSize('small')}>
                        <SizeSmallIcon style={[styles.icon, size === 'small' && styles.selectedIcon]}/>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setSize('medium')} >
                        <SizeMediumIcon style={[styles.icon, size === 'medium' && styles.selectedIcon]}/>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setSize('large')} >
                        <SizeLargeIcon style={[styles.icon, size === 'large' && styles.selectedIcon]}/>
                      </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.line}></View>
            <View>
                <View style={styles.option}>
                    <Text>Ice</Text>
                    <View style={styles.iconContainer}>
                      <TouchableOpacity onPress={() => setIce('1/3 ice')}>
                        <OneThirdIcedIcon style={styles.icon} color={ice === '1/3 ice' ? 'black' : '#D8D8D8'} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setIce('2/3 ice')} >
                        <TwoThirdIcedIcon style={styles.icon} color={ice === '2/3 ice' ? 'black' : '#D8D8D8'} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setIce('full ice')} >
                        <FullIcedIcon style={styles.icon} color={ice === 'full ice' ? 'black' : '#D8D8D8'} />
                      </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.cart}>
              <View style={styles.total}>
                <Text style={styles.totalText}>Total Amount</Text>
                <Text style={styles.totalText}>${(count*price).toFixed(2)}</Text>
              </View>
              <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
                <Text style={{color: '#ffffff', textAlign: 'center', lineHeight: 50}}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 26,
        marginTop: 20,
        backgroundColor: '#ffffff',
    },
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        
    },
    title: {
        fontSize: 16,
        fontWeight: 500,
        color: '#001833',
        fontFamily: 'Poppins'
    },
    coffeeItem: {
      borderRadius: 15,
      height: 160,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 15,
      backgroundColor: '#F7F8FB',
  },
  coffeeName: {
      fontFamily: 'DM Sans',
      fontSize: 14,
      color: '#001833',
      fontWeight: '500',
      marginTop: 20,
  },
  option: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 30,
  },
  optionText: {
      fontFamily: 'DM Sans',
      fontSize: 14,
      color: '#001833',
      fontWeight: '500',
  },
  line: {
      height: 1,
      backgroundColor: '#F4F5F7',
  },
  cnt:{
    flexDirection: 'row',
    borderWidth: 1.2,
    borderColor: '#D8D8D8',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    height: 29,
  },
  buttonCnt:{
    color: '#001833',
    marginHorizontal: 10,
    fontSize: 16,
  },
  shotContainer: {
    flexDirection: 'row',
  },
  button:{
    color: '#D8D8D8',
    marginLeft: 15,
    fontSize: 14,
    borderRadius: 50,
    borderWidth: 1.2,
    borderColor: '#D8D8D8',
    paddingVertical: 5,
    width: 73,
    textAlign: 'center',
  },
  selectedShot:{
    color: '#001833',
    marginLeft: 15,
    fontSize: 14,
    borderRadius: 50,
    borderWidth: 1.2,
    borderColor: '#D8D8D8',
    paddingVertical: 5,
    width: 73,
    textAlign: 'center',
  },
  iconContainer:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon:{
    color: '#D8D8D8',
    marginLeft: 25,
  },
  selectedIcon:{
    color: '#000000',
    marginLeft: 25,
  },
  total:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  addToCartButton: {
    backgroundColor: '#324A59',
    height: 50,
    borderRadius: 30,
  },
  cart:{
    flex: 1,
    justifyContent: 'flex-end',
  },
  totalText:{
    color: '#001833',
    fontSize: 16,
    fontWeight: '500',
  }
});

