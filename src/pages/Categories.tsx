import { ScrollView, StyleSheet, Touchable, TouchableOpacity, View } from 'react-native';
import { Button, Card, Dialog, IconButton, MD3Colors, Modal, Snackbar, Surface, Switch, Text, TextInput } from 'react-native-paper';
import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { TotalState } from '../Interface/totalState';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addProduct, updateProduct, deleteProduct } from '../redux/action';
import { ProductData } from '../Interface/Product';

export interface CategoriesProps {

}

const Categories = (props: CategoriesProps) => {

    const categories = useSelector((state: TotalState) => state.categories);
    const products = useSelector((state: TotalState) => state.products);
    const [selectedCategory, setSelectedCategory] = React.useState(0);
    const [productSingle, setProductSingle] = React.useState<ProductData>();
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const dispatch = useDispatch();
    const containerStyle = { backgroundColor: 'white', padding: 20, margin: 10, innerHeight: 100 };
    const [allProducts, setAlProducts] = React.useState<Array<ProductData>>(products);
    const [toastText, setToastText] = React.useState('');
    const [snackBarvisible, setSnackBarVisible] = React.useState(false);
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const onDismissSnackBar = () => setSnackBarVisible(false);
    const [dialogVisible, setDialogVisible] = React.useState(false);
    const [deleteID, setDrleteID] = React.useState(0);
    const [date, setDate] = React.useState(new Date());
    const onToggleSwitch = (fieldName, fieldType, categoryID) => {
        setIsSwitchOn(!isSwitchOn);
        handleFieldChange(fieldName, !isSwitchOn, fieldType, categoryID);
    };
    const hideDialog = () => setDialogVisible(false);
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
    const handleDateChange = (event, selectedDate, fieldName, categoryID) => {
        const currentDate = selectedDate;
        setDate(currentDate);
        handleFieldChange(fieldName, String(currentDate), 'date', categoryID);
    }
    const handleAddProduct = () => {
        showModal();
    }
    const handleSelectedCategory = (categoryID) => {
        setSelectedCategory(categoryID);
    }
    const createProduct = () => {
        dispatch(addProduct(productSingle))
        const newAllProd = [...allProducts];
        newAllProd.push(productSingle);
        setAlProducts(newAllProd);
        setSnackBarVisible(true);
        setToastText('Product Successfully Added');
        hideModal();
    }
    const deleteProductData = (prodID) => {
        setDrleteID(prodID);
        setDialogVisible(true);
    }
    const hardDeleteProduct = () => {
        let newAllProds: Array<ProductData> = [...allProducts];
        newAllProds = newAllProds.filter(item => item.productID !== deleteID);
        dispatch(deleteProduct(newAllProds));
        setAlProducts(newAllProds);
        setSnackBarVisible(true);
        setToastText('Product Successfully Deleted');
        setDialogVisible(false);
    }
    const addNewProduct = (categoryID) => {
        const categoryData = categories.filter(item => item.categoryID === categoryID);
        const categoryFields = categoryData[0].categoryFields;
        return (
            <>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <ScrollView>
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
                                            onChange={(event, selDate) => handleDateChange(event, selDate, prod.fieldName, categoryID)}
                                        />
                                    </View>
                                )
                            }

                        })}
                        <Button mode='contained' style={{ marginTop: 10 }} onPress={() => createProduct()}>Save</Button>
                    </ScrollView>
                </Modal>
            </>
        )

    }
    if (categories.length === 0) {
        return (
            <Text>
                No Categories Available
            </Text>
        )
    }
    return (
        <>
            <ScrollView>
                {selectedCategory === 0 ? (
                    <View style={styles.container}>
                        {categories?.map((item, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => handleSelectedCategory(item.categoryID)}>
                                    <Surface style={styles.surface} elevation={4}>
                                        <Text>{item.categoryName}</Text>
                                    </Surface>
                                </TouchableOpacity>
                            )
                        })}

                    </View>
                ) : (
                    <>
                        <Card style={styles.card}>
                            <Card.Content>
                                <View>
                                    <Text style={{ fontSize: 20 }}>
                                        {categories?.filter(item => item.categoryID === selectedCategory)[0].categoryName}
                                    </Text>
                                    <Button icon="plus-circle" style={styles.button} mode="contained" onPress={handleAddProduct}>
                                        Add New Product
                                    </Button>
                                </View>
                            </Card.Content>
                        </Card>
                        {allProducts.filter(item => item.categoryID === selectedCategory).map(item => {
                            return (
                                <Card style={styles.card}>
                                    <Card.Content>
                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                            <Text style={{ fontSize: 20 }}>
                                                {item.productName}
                                            </Text>
                                            <IconButton
                                                icon="delete"
                                                iconColor={MD3Colors.error50}
                                                size={20}
                                                onPress={() => deleteProductData(item.productID)}
                                            />
                                        </View>
                                    </Card.Content>
                                </Card>
                            )
                        })}
                    </>
                )}

            </ScrollView>
            {selectedCategory !== 0 ? addNewProduct(selectedCategory) : null}
            {selectedCategory !== 0 && (
                <Button style={styles.button} mode="contained" onPress={() => setSelectedCategory(0)}>
                    All Categories
                </Button>
            )}
            <Snackbar
                visible={snackBarvisible}
                onDismiss={onDismissSnackBar}
                duration={2000}
            >
                {toastText}
            </Snackbar>
            <Dialog visible={dialogVisible} onDismiss={hideDialog}>
                <Dialog.Content>
                    <Text variant="bodyMedium">Are you sure you want to delete the Product? </Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button textColor='red' onPress={hardDeleteProduct}>OK</Button>
                    <Button onPress={hideDialog}>Cancel</Button>
                </Dialog.Actions>
            </Dialog>
        </>
    )
}

export default Categories

const styles = StyleSheet.create({
    surface: {
        padding: 8,
        height: 150,
        width: 150,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 20
    },
    button: {
        margin: 10
    },
    card: {
        backgroundColor: '#fff',
        margin: 10
    },
});