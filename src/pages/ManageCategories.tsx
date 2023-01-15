import { StyleSheet, View, ScrollView } from 'react-native'
import { Avatar, Button, Card, Text, Modal, Portal, TextInput, Menu, IconButton, MD3Colors, Snackbar, Dialog } from 'react-native-paper';
import { CategoryData } from '../Interface/Category';
import React, { useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { addCategory, deleteCategory } from '../redux/action';
import { TotalState } from '../Interface/totalState';

export interface ManageCategoriesProps {
}

const ManageCategories = (props: ManageCategoriesProps) => {

    const [visible, setVisible] = React.useState(false);
    const [menuvisible, setMenuVisible] = React.useState(false);
    const [insideMenuVisible, setInsideMenuVisible] = React.useState<Array<boolean>>([]);
    const [addCategoryFields, setAddCategoryFields] = React.useState<CategoryData>(null);
    const [snackBarvisible, setSnackBarVisible] = React.useState(false);
    const [toastText, setToastText] = React.useState('');
    const [dialogVisible, setDialogVisible] = React.useState(false);
    const [deleteCategoryID, setDreleteCategoryID] = React.useState();

    const showDialog = () => setDialogVisible(true);

    const hideDialog = () => setDialogVisible(false);
    const categories = useSelector((state: TotalState) => state.categories);
    const dispatch = useDispatch();

    const onToggleSnackBar = () => setSnackBarVisible(!snackBarvisible);

    const onDismissSnackBar = () => setSnackBarVisible(false);

    const openMenu = () => setMenuVisible(true);
    const openMenuInside = (index) => {
        const newInsideMenuVisible = [...insideMenuVisible];
        newInsideMenuVisible[index] = true;
        setInsideMenuVisible(newInsideMenuVisible);
    }
    const closeMenu = () => setMenuVisible(false);
    const closeMenuInside = (index) => {
        const newinsideMenuVisible = [...insideMenuVisible];
        newinsideMenuVisible[index] = false;
        setInsideMenuVisible(newinsideMenuVisible);
    }

    const setTextInside = (text, index) => {
        const newAddCategoryFields = { ...addCategoryFields };
        const foundArr = newAddCategoryFields.categoryFields;
        foundArr[index].fieldName = text;
        setAddCategoryFields(newAddCategoryFields);
    }

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 20, margin: 10, innerHeight: 1000 };

    const handleOptionClick = (type) => {
        const newAddCategoryFields = { ...addCategoryFields };
        const newinsideMenuVisible = [...insideMenuVisible];
        const foundArr = newAddCategoryFields.categoryFields;
        if (foundArr !== undefined) {
            foundArr.push({
                fieldName: '',
                fieldType: type,
                isDeleteted: false
            });
        } else {
            newAddCategoryFields.categoryFields = [{
                fieldName: '',
                fieldType: type,
                isDeleteted: false
            }];
        }
        newinsideMenuVisible.push(false);
        setAddCategoryFields(newAddCategoryFields);
        setInsideMenuVisible(newinsideMenuVisible);
        closeMenu();
    }

    const handleOptionClickInside = (type, index) => {
        const newAddCategoryFields = { ...addCategoryFields };
        const foundArr = newAddCategoryFields.categoryFields;
        foundArr[index].fieldType = type;
        setAddCategoryFields(newAddCategoryFields);
        closeMenuInside(index);
    }

    const deleteField = (index) => {
        const newAddCategoryFields = { ...addCategoryFields };
        const foundArr = newAddCategoryFields.categoryFields;
        foundArr.splice(index, 1);
        setAddCategoryFields(newAddCategoryFields);
        onToggleSnackBar();
        setToastText('Field Successfully Deleted');
    }

    const handleCategoryName = (text) => {
        const newAddCategoryFields = { ...addCategoryFields };
        newAddCategoryFields.categoryName = text;
        setAddCategoryFields(newAddCategoryFields);
    }

    const createCategory = () => {
        dispatch(addCategory(addCategoryFields));
        resetCategoryData();
        setToastText('Category Successfully Created');
        hideModal();
    }

    const resetCategoryData = () => {
        setAddCategoryFields(null);
    }

    const handleCategoryEdit = (categoryID) => {
        let newCategory = [...categories];
        newCategory = newCategory.filter(item => item.categoryID === categoryID);
        setAddCategoryFields(newCategory[0]);
        showModal();
    }

    const deleteCategoryClick = (categoryID) => {
        showDialog();
        setDreleteCategoryID(categoryID);
    }

    const hardDeleteCategory = () => {
        dispatch(deleteCategory(deleteCategoryID));
        hideDialog();
    }

    const handleAddCategory = () => {
        setAddCategoryFields(null);
        showModal();
    }

    return (
        <>
            <ScrollView>
                {categories?.map((item, index) => {
                    return (
                        <Card key={index} style={styles.card}>
                            <Card.Content>
                                <Text variant="titleLarge">{item.categoryName}</Text>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <Button mode='contained' onPress={() => handleCategoryEdit(item.categoryID)}>Edit Category</Button>
                                    <IconButton
                                        icon="delete"
                                        iconColor={MD3Colors.error50}
                                        size={20}
                                        style={{ marginTop: 5 }}
                                        onPress={() => deleteCategoryClick(item.categoryID)}
                                    />
                                </View>
                            </Card.Content>
                        </Card>
                    )
                })}
            </ScrollView>
            <Button icon="plus-circle" style={styles.button} mode="contained" onPress={handleAddCategory}>
                Add New Category
            </Button>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <ScrollView>
                    <TextInput
                        label="Category Name"
                        value={addCategoryFields?.categoryName}
                        mode="outlined"
                        style={{ color: 'red' }}
                        onChangeText={text => handleCategoryName(text)}
                    />
                    {addCategoryFields?.categoryFields?.map((item, index) => {
                        return (
                            <View key={index} style={styles.fieldMenu}>
                                <TextInput
                                    label="Field Name"
                                    value={item.fieldName}
                                    mode="outlined"
                                    style={{ color: 'red', width: '50%' }}
                                    onChangeText={text => setTextInside(text, index)}
                                />
                                <View
                                    style={styles.menuInside}>
                                    <Menu
                                        visible={insideMenuVisible[index]}
                                        onDismiss={() => closeMenuInside(index)}
                                        anchor={<Button mode='outlined' onPress={() => openMenuInside(index)}>{item.fieldType}</Button>}>
                                        <Menu.Item onPress={() => handleOptionClickInside('text', index)} title="Text" />
                                        <Menu.Item onPress={() => handleOptionClickInside('date', index)} title="Date" />
                                        <Menu.Item onPress={() => handleOptionClickInside('number', index)} title="Number" />
                                        <Menu.Item onPress={() => handleOptionClickInside('checkbox', index)} title="Checkbox" />
                                    </Menu>
                                </View>
                                <View>
                                    <IconButton
                                        icon="delete"
                                        iconColor={MD3Colors.error50}
                                        size={20}
                                        style={{ marginTop: 10 }}
                                        onPress={() => deleteField(index)}
                                    />
                                </View>
                            </View>
                        )
                    })}
                    <View
                        style={styles.menu}>
                        <Menu
                            visible={menuvisible}
                            onDismiss={closeMenu}
                            anchor={<Button mode='contained' onPress={openMenu}>Add Field</Button>}>
                            <Menu.Item onPress={() => handleOptionClick('text')} title="Text" />
                            <Menu.Item onPress={() => handleOptionClick('date')} title="Date" />
                            <Menu.Item onPress={() => handleOptionClick('number')} title="Number" />
                            <Menu.Item onPress={() => handleOptionClick('checkbox')} title="Checkbox" />
                        </Menu>
                    </View>
                    <View>
                        <Button disabled={addCategoryFields === null || addCategoryFields?.categoryFields?.length === 0} mode='contained' style={{ marginTop: 10 }} onPress={createCategory}>Save</Button>
                        <Button mode='contained' style={{ marginTop: 10, backgroundColor: 'grey' }} onPress={resetCategoryData}>Reset</Button>
                    </View>
                </ScrollView>

            </Modal>
            <Snackbar
                visible={snackBarvisible}
                onDismiss={onDismissSnackBar}
                duration={1000}
            >
                {toastText}
            </Snackbar>
            <Dialog visible={dialogVisible} onDismiss={hideDialog}>
                <Dialog.Content>
                    <Text variant="bodyMedium">Are you sure you want to delete the Category? All the products related to that category will be deleted</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button textColor='red' onPress={hardDeleteCategory}>OK</Button>
                    <Button onPress={hideDialog}>Cancel</Button>
                </Dialog.Actions>
            </Dialog>
        </>

    )
}

export default ManageCategories

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        margin: 10
    },
    button: {
        margin: 10
    },
    menu: {
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    fieldMenu: {
        // flex: 1,
        flexDirection: 'row',
        height: 50
    },
    menuInside: {
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginLeft: 5,
        width: 120
    }
})