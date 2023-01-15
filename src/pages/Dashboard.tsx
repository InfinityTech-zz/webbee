import { ScrollView, StyleSheet, View, DatePickerIOS } from 'react-native'
import React, { useEffect } from 'react'
import { Surface, Appbar, TouchableRipple, Card, IconButton, Text, Button, MD3Colors, TextInput, Switch, Snackbar } from 'react-native-paper';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { TotalState } from '../Interface/totalState';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addProduct, updateProduct, deleteProduct } from '../redux/action';
import { ProductData } from '../Interface/Product';

export interface DashboardProps {
}

const Dashboard = (props: DashboardProps) => {
    const categories = useSelector((state: TotalState) => state.categories);
    const products = useSelector((state: TotalState) => state.products);
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const onToggleSwitch = (fieldName, fieldType, categoryID) => {
        setIsSwitchOn(!isSwitchOn);
        handleFieldChange(fieldName, !isSwitchOn, fieldType, categoryID);
    };
    const [date, setDate] = React.useState(new Date());
    const [allProducts, setAlProducts] = React.useState<Array<ProductData>>(products);
    const [productSingle, setProductSingle] = React.useState<ProductData>();
    const [selectedCategory, setSelectedCategory] = React.useState('');
    const [snackBarvisible, setSnackBarVisible] = React.useState(false);
    const onDismissSnackBar = () => setSnackBarVisible(false);
    const [toastText, setToastText] = React.useState('');
    const dispatch = useDispatch();


    const handleProductNameChange = (text) => {
        const newProductSingle = { ...productSingle };
        newProductSingle.productName = text;
        setProductSingle(newProductSingle);

    }

    const handleFieldChange = (fieldName, fieldValue, fieldType, categoryID) => {
        const newProductSingle = { ...productSingle };
        newProductSingle.categoryID = categoryID;
        const foundArr = newProductSingle?.productDetails;
        let flag = 0;
        if (newProductSingle?.productDetails?.length > 0) {
            for (let i = 0; i <= foundArr.length; i++) {
                if (foundArr[i]?.fieldName === fieldName) {
                    foundArr[i].fieldValue = fieldValue;
                    flag = 1;
                }
            }
            if (flag === 0) {
                newProductSingle.productDetails.push({
                    fieldName,
                    fieldValue,
                    fieldType
                })
            }
        } else {
            newProductSingle.productDetails = [{
                fieldName,
                fieldValue,
                fieldType
            }];
        }

        setProductSingle(newProductSingle);
    }

    const handleDateChange = (event, selectedDate, fieldName, fieldValue, categoryID) => {
        const currentDate = selectedDate;
        setDate(currentDate);
        handleFieldChange(fieldName, String(currentDate), 'date', categoryID);
    }

    const handleAddNewProduct = (categoryName) => {
        setSelectedCategory(categoryName);
        setProductSingle(null);
    }

    const addNewProduct = (categoryFields, categoryID) => {
        return (
            <>
                <TextInput
                    label="Product Name"
                    value={productSingle?.productName}
                    mode="outlined"
                    style={{ color: 'red' }}
                    onChangeText={text => handleProductNameChange(text)}
                />
                {categoryFields?.map((prod, index) => {
                    if (prod.fieldType === 'text') {
                        return (
                            <TextInput
                                key={index}
                                label={prod.fieldName}
                                value={productSingle?.productDetails?.filter(item => item.fieldName === prod.fieldName)[0]?.fieldValue as string}
                                mode="outlined"
                                style={{ color: 'red' }}
                                onChangeText={text => handleFieldChange(prod.fieldName, text, prod.fieldType, categoryID)}
                            />
                        )
                    } else if (prod.fieldType === 'number') {
                        return (
                            <TextInput
                                key={index}
                                label={prod.fieldName}
                                value={productSingle?.productDetails?.filter(item => item.fieldName === prod.fieldName)[0]?.fieldValue as string}
                                mode="outlined"
                                style={{ color: 'red' }}
                                onChangeText={text => handleFieldChange(prod.fieldName, text, prod.fieldType, categoryID)}
                            />
                        )
                    } else if (prod.fieldType === 'checkbox') {
                        return (
                            <View key={index} style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                <Text style={{ fontSize: 25 }}>
                                    {prod.fieldName}
                                </Text>
                                <Switch style={{ marginLeft: 20 }} value={isSwitchOn} onValueChange={() => onToggleSwitch(prod.fieldName, prod.fieldType, categoryID)} />
                            </View>
                        )
                    } else if (prod.fieldType === 'date') {
                        return (
                            <View key={index} style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                <Text style={{ fontSize: 25 }}>
                                    {prod.fieldName}
                                </Text>
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    mode="date"
                                    is24Hour={true}
                                    onChange={(event, selDate) => handleDateChange(event, selDate, prod.fieldName, prod.fieldValue, prod.categoryID)}
                                />
                            </View>
                        )
                    }

                })}
                <Button mode='contained' style={{ marginTop: 10 }} onPress={createProduct}>Save</Button>
                <Button mode='contained' style={{ marginTop: 10, backgroundColor: 'grey' }} onPress={resetProduct}>Reset</Button>
            </>
        )

    }

    const createProduct = () => {
        dispatch(addProduct(productSingle))
        setSnackBarVisible(true);
        setToastText('Product Successfully Added');
    }

    const editProduct = () => {
        dispatch(updateProduct(allProducts));
        setSnackBarVisible(true);
        setToastText('Product Successfully Modified');
    }

    const resetProduct = () => {

    }

    const onToggleSwitchList = (fieldName, fieldType, prodID) => {
        const newAllProds: Array<ProductData> = [...allProducts];
        for (let i = 0; i <= newAllProds?.length; i++) {
            if (newAllProds[i]?.productID === prodID) {
                for (let j = 0; j <= newAllProds[i]?.productDetails?.length; j++) {
                    if (newAllProds[i]?.productDetails[j]?.fieldName === fieldName) {
                        newAllProds[i].productDetails[j].fieldValue = !newAllProds[i].productDetails[j].fieldValue;
                    }
                }
            }
        }
        setAlProducts(newAllProds);
    }

    const handleFieldChangeList = (fieldName, text, fieldType, prodID) => {
        const newAllProds: Array<ProductData> = [...allProducts];
        for (let i = 0; i <= newAllProds?.length; i++) {
            if (newAllProds[i]?.productID === prodID) {
                for (let j = 0; j <= newAllProds[i]?.productDetails?.length; j++) {
                    if (newAllProds[i]?.productDetails[j]?.fieldName === fieldName) {
                        newAllProds[i].productDetails[j].fieldValue = text;
                    }
                }
            }
        }
        setAlProducts(newAllProds);
    }

    const handleProductNameChangeList = (text, prodID) => {
        let newAllProds: Array<ProductData> = [...allProducts];
        for (let i = 0; i <= newAllProds?.length; i++) {
            if (newAllProds[i]?.productID === prodID) {
                newAllProds[i].productName = text;
            }
        }
        setAlProducts(newAllProds);
    }

    const handleDateChangeList = (event, selectedDate, fieldName, fieldValue, prodID) => {
        const currentDate = selectedDate;
        const newAllProds: Array<ProductData> = [...allProducts];
        for (let i = 0; i <= newAllProds?.length; i++) {
            if (newAllProds[i]?.productID === prodID) {
                for (let j = 0; j <= newAllProds[i]?.productDetails?.length; j++) {
                    if (newAllProds[i]?.productDetails[j]?.fieldName === fieldName) {
                        newAllProds[i].productDetails[j].fieldValue = currentDate;
                    }
                }
            }
        }
        setAlProducts(newAllProds);
    }

    const deleteProductData = (prodID) => {
        let newAllProds: Array<ProductData> = [...allProducts];
        newAllProds = newAllProds.filter(item => item.productID !== prodID);
        dispatch(deleteProduct(newAllProds));
        setAlProducts(newAllProds);
        setSnackBarVisible(true);
        setToastText('Product Successfully Deleted');
    }

    useEffect(() => {
        if (products.length > 0) {
            setAlProducts(products);
        }
    }, [products])

    return (
        <>
            <ScrollView>
                {categories?.map((item, index) => {
                    return (
                        <>
                            <View style={{ flex: 1, flexDirection: 'row', margin: 20 }}>
                                <Text variant="titleLarge">{item.categoryName}</Text>
                                <Button mode='contained' style={{ alignContent: 'flex-end' }} onPress={() => handleAddNewProduct(item.categoryName)}> Add New Product</Button>
                            </View>
                            {allProducts.filter(newProd => newProd.categoryID === item.categoryID).length === 0 ? (
                                <Text style={{ marginLeft: 20 }}>
                                    No Products Availavle
                                </Text>
                            ) : (

                                <>
                                    {allProducts.map((newProd, index) => {
                                        if (newProd.categoryID === item.categoryID)
                                            return (
                                                <>
                                                    <Card key={index} style={styles.card}>
                                                        <Card.Content>
                                                            <TextInput
                                                                label="Product Name"
                                                                value={newProd?.productName}
                                                                mode="outlined"
                                                                style={{ color: 'red' }}
                                                                onChangeText={text => handleProductNameChangeList(text, newProd.productID)}
                                                            />
                                                            {newProd?.productDetails?.map((prod, index) => {
                                                                if (prod.fieldType === 'text') {
                                                                    return (
                                                                        <TextInput
                                                                            key={index}
                                                                            label={prod.fieldName}
                                                                            value={newProd?.productDetails?.filter(item => item.fieldName === prod.fieldName)[0]?.fieldValue as string}
                                                                            mode="outlined"
                                                                            style={{ color: 'red' }}
                                                                            onChangeText={text => handleFieldChangeList(prod.fieldName, text, prod.fieldType, newProd.productID)}
                                                                        />
                                                                    )
                                                                } else if (prod.fieldType === 'number') {
                                                                    return (
                                                                        <TextInput
                                                                            key={index}
                                                                            label={prod.fieldName}
                                                                            value={newProd?.productDetails?.filter(item => item.fieldName === prod.fieldName)[0]?.fieldValue as string}
                                                                            mode="outlined"
                                                                            style={{ color: 'red' }}
                                                                            onChangeText={text => handleFieldChangeList(prod.fieldName, text, prod.fieldType, newProd.productID)}
                                                                        />
                                                                    )
                                                                } else if (prod.fieldType === 'checkbox') {
                                                                    return (
                                                                        <View key={index} style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                                                            <Text style={{ fontSize: 25 }}>
                                                                                {prod.fieldName}
                                                                            </Text>
                                                                            <Switch style={{ marginLeft: 20 }} value={newProd?.productDetails?.filter(item => item.fieldName === prod.fieldName)[0]?.fieldValue as boolean} onValueChange={() => onToggleSwitchList(prod.fieldName, prod.fieldType, newProd.productID)} />
                                                                        </View>
                                                                    )
                                                                } else if (prod.fieldType === 'date') {
                                                                    let foundDate;
                                                                    if (newProd?.productDetails?.filter(item => item.fieldName === prod.fieldName)[0]?.fieldValue !== undefined) {
                                                                        foundDate = new Date(newProd?.productDetails?.filter(item => item.fieldName === prod.fieldName)[0]?.fieldValue as Date)
                                                                    } else {
                                                                        foundDate = new Date();
                                                                    }
                                                                    return (
                                                                        <View key={index} style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                                                            <Text style={{ fontSize: 25 }}>
                                                                                {prod.fieldName}
                                                                            </Text>
                                                                            <DateTimePicker
                                                                                testID="dateTimePicker"
                                                                                value={foundDate}
                                                                                mode="date"
                                                                                is24Hour={true}
                                                                                onChange={(event, selDate) => handleDateChangeList(event, selDate, prod.fieldName, prod.fieldValue, newProd.productID)}
                                                                            />
                                                                        </View>
                                                                    )
                                                                }

                                                            })}
                                                            <Button mode='contained' style={{ marginTop: 10 }} onPress={editProduct}>Save</Button>
                                                            <Button mode='outlined' textColor='red' style={{ marginTop: 10 }} onPress={() => deleteProductData(newProd.productID)}>Delete</Button>
                                                        </Card.Content>
                                                    </Card>
                                                </>
                                            )
                                    })}
                                </>

                            )}
                            <>
                                <Card key={index} style={styles.card}>
                                    <Card.Content>
                                        {selectedCategory === item.categoryName ? addNewProduct(item?.categoryFields, item?.categoryID) : null}
                                    </Card.Content>
                                </Card>
                            </>

                        </>
                    )
                })}

            </ScrollView>
            <Snackbar
                visible={snackBarvisible}
                onDismiss={onDismissSnackBar}
                duration={2000}
            >
                {toastText}
            </Snackbar>
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
