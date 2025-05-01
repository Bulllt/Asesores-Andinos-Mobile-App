import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  Button,
  DataTable,
  IconButton,
  ActivityIndicator,
} from "react-native-paper";
import { CurvedTop } from "../../components/curvedTop";
import { Navbar } from "../../components/navbar";
import { GetItems } from "../../constants/api";

import style from "./style";
import { colors } from "../../constants/colors";
import { wp } from "../../constants/device";

export default function ItemsScreen() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const data = await GetItems();
        setItems(data);
      } catch (error) {
        console.error(error.message || "Error loading items");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);
  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.item_id.toString().toLowerCase().includes(searchQuery)
  );

  const itemsPerPage = 8;
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, filteredItems.length);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const IOS = Platform.OS === "ios";
  const height = IOS ? 79 : 81;

  if (loading) {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require("../../assets/images/background.webp")}
          blurRadius={4}
          style={style.itemsBackground}
        >
          <View style={style.itemsCurvedBackground}>
            <CurvedTop
              color={"#F5F5F8"}
              width={100}
              height={height}
              depth={0.1}
            />
          </View>
        </ImageBackground>

        <Navbar
          onSearchChange={setSearchQuery}
          searchQuery={searchQuery}
          activeRoute={"items"}
        />

        <View style={style.titleContainer}>
          <IconButton
            icon="arrow-left"
            iconColor={colors.black}
            size={wp(8)}
            onPress={() => router.back()}
            style={style.titleIcon}
          />
          <View style={style.titleCenterContainer}>
            <Text style={style.titleText}>Lista de Productos</Text>
          </View>
        </View>

        <View style={style.itemsLoad}>
          <ActivityIndicator
            animating={true}
            color={colors.main}
            size={wp(20)}
          />
        </View>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require("../../assets/images/background.webp")}
          blurRadius={4}
          style={style.itemsBackground}
        >
          <View style={style.itemsCurvedBackground}>
            <CurvedTop
              color={"#F5F5F8"}
              width={100}
              height={height}
              depth={0.1}
            />
          </View>
        </ImageBackground>

        <Navbar
          onSearchChange={setSearchQuery}
          searchQuery={searchQuery}
          activeRoute={"items"}
        />

        <View style={style.titleContainer}>
          <IconButton
            icon="arrow-left"
            iconColor={colors.black}
            size={wp(8)}
            onPress={() => router.back()}
            style={style.titleIcon}
          />
          <View style={style.titleCenterContainer}>
            <Text style={style.titleText}>Lista de Productos</Text>
          </View>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={style.keyboardAvoidingView}
        >
          <ScrollView
            contentContainerStyle={style.scrollViewContent}
            keyboardShouldPersistTaps="handled"
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={style.itemsContainer}>
                <View style={style.actionsContainer}>
                  <IconButton
                    icon="file-pdf-box"
                    iconColor={colors.red}
                    size={wp(6)}
                    onPress={() => {}}
                  />
                  <IconButton
                    icon="file-excel"
                    iconColor={colors.green}
                    size={wp(6)}
                    onPress={() => {}}
                  />
                  <IconButton
                    icon="printer"
                    iconColor={colors.black}
                    size={wp(6)}
                    onPress={() => {}}
                  />
                </View>

                <View style={style.tableContainer}>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <TouchableWithoutFeedback>
                      <DataTable style={style.table}>
                        <DataTable.Header>
                          <DataTable.Title style={style.headerCell1}>
                            ID
                          </DataTable.Title>

                          <DataTable.Title style={style.headerCell}>
                            Nombre del producto
                          </DataTable.Title>

                          <DataTable.Title style={style.headerCell}>
                            Categoría
                          </DataTable.Title>

                          <DataTable.Title style={style.headerCell}>
                            Descripción
                          </DataTable.Title>

                          <DataTable.Title style={style.headerCell}>
                            Detalles
                          </DataTable.Title>
                        </DataTable.Header>

                        {filteredItems
                          .slice(from, to)
                          .map((item, index, array) => (
                            <DataTable.Row
                              key={item.item_id}
                              style={
                                index === array.length - 1
                                  ? style.lastRow
                                  : style.row
                              }
                            >
                              <DataTable.Cell style={style.cell1}>
                                {item.item_id}
                              </DataTable.Cell>

                              <DataTable.Cell style={style.cell}>
                                {item.name}
                              </DataTable.Cell>

                              <DataTable.Cell style={style.cell}>
                                {item.category.join(", ")}
                              </DataTable.Cell>

                              <DataTable.Cell style={style.cell}>
                                {item.description}
                              </DataTable.Cell>

                              <DataTable.Cell style={style.cell}>
                                {item.details}
                              </DataTable.Cell>
                            </DataTable.Row>
                          ))}
                      </DataTable>
                    </TouchableWithoutFeedback>
                  </ScrollView>
                </View>

                <View style={style.paginationContainer}>
                  <Button
                    mode="text"
                    onPress={() => setPage(Math.max(0, page - 1))}
                    disabled={page === 0}
                    icon="chevron-left"
                  >
                    Anterior
                  </Button>

                  <Button
                    mode={page === 0 ? "contained" : "text"}
                    onPress={() => setPage(0)}
                    style={style.pageButton}
                  >
                    1
                  </Button>

                  {page > 1 && <Text style={style.ellipsis}>...</Text>}
                  {page > 0 && page < totalPages - 1 && (
                    <Button
                      mode="contained"
                      onPress={() => setPage(page)}
                      style={style.pageButton}
                    >
                      {page + 1}
                    </Button>
                  )}
                  {page < totalPages - 2 && (
                    <Text style={style.ellipsis}>...</Text>
                  )}

                  {totalPages > 1 && (
                    <Button
                      mode={page === totalPages - 1 ? "contained" : "text"}
                      onPress={() => setPage(totalPages - 1)}
                      style={style.pageButton}
                    >
                      {totalPages}
                    </Button>
                  )}

                  <Button
                    mode="text"
                    onPress={() => setPage(Math.min(totalPages - 1, page + 1))}
                    disabled={page >= totalPages - 1}
                    icon="chevron-right"
                    contentStyle={{ flexDirection: "row-reverse" }}
                  >
                    Siguiente
                  </Button>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}
