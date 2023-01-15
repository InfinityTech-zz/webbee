import { ScrollView, StyleSheet, View} from 'react-native'
import React from 'react'
import { Surface, Appbar, TouchableRipple, Card, IconButton, Text, Button, MD3Colors, TextInput,  } from 'react-native-paper';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { TotalState } from '../Interface/totalState';

export interface DashboardProps {
}



const Dashboard = (props: DashboardProps) => {
  const categories = useSelector((state: TotalState) => state.categories);
  console.log('categories', categories[3].categoryFields)
  const products = useSelector((state: TotalState) => state.products);
  const addNewProduct = (categoryFields) => {
    let totalStr = '';
    categoryFields.map((item) => {
        console.log(item)
        totalStr += '<Text></Text>'
    })
    
  }

  return (
    <>
    <ScrollView>
    {categories?.map((item, index) => {
        return (
            <>
            <View style={{ flex:1, flexDirection: 'row', margin: 20}}>
              <Text variant="titleLarge">{item.categoryName}</Text>
              <Button mode='contained' style={{ alignContent: 'flex-end'}} onPress={() => addNewProduct(item.categoryFields)}> Add New Item</Button>
            </View>
            <Card key={index} style={styles.card}>
            <Card.Content>
            {item?.categoryFields?.map((prod) => {
                if(prod.fieldType === 'text') {
                    return (
                        <TextInput
                            label={prod.fieldName}
                            value=""
                            mode="outlined"
                            style={{ color: 'red', width: '50%'}}
                            onChangeText={text => {}}
                        />
                    )
                } else if(prod.fieldType === 'number') {
                    return (
                        <TextInput
                            label={prod.fieldName}
                            value=""
                            mode="outlined"
                            style={{ color: 'red', width: '50%'}}
                            onChangeText={text => {}}
                        />
                    )
                }
                
            })}
            </Card.Content>
            </Card>
            </>
        )
    })}
    </ScrollView>
   
    </>
   
  )
}

export default Dashboard

const styles = StyleSheet.create({
    surface: {
        padding: 8,
        height: 100,
        width: 100,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
      },
      dashboardContainer: {
        flex: 1,
        justifyContent: 'flex-start',
      },
      card: {
        backgroundColor: '#fff',
        margin: 10
    },
    button: {
        margin: 10
    },  
})
