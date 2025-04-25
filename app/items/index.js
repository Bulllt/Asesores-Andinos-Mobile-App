import React, { useState } from "react";
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
import { Button, DataTable, IconButton } from "react-native-paper";
import { CurvedTop } from "../../components/curvedTop";
import { Navbar } from "../../components/navbar";

import style from "./style";
import { colors } from "../../constants/colors";
import { wp } from "../../constants/device";
import { mockProducts } from "./mockData";

export default function ItemsScreen() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);

  const filteredProducts = mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const itemsPerPage = 7;
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, filteredProducts.length);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require("../../assets/images/background.webp")}
          blurRadius={4}
          style={style.itemsBackground}
        >
          <View style={style.itemsCurvedBackground}>
            <CurvedTop color={"#F5F5F8"} width={100} height={80} depth={0.1} />
          </View>
        </ImageBackground>

        <Navbar onSearchChange={setSearchQuery} searchQuery={searchQuery} />

        <View style={style.titleContainer}>
          <IconButton
            icon="arrow-left"
            iconColor={colors.black}
            size={wp(8)}
            onPress={() => router.back()}
          />
          <Text style={style.titleText}>Lista de Productos</Text>
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
                    iconColor={colors.black}
                    size={wp(6)}
                    onPress={() => {}}
                  />
                  <IconButton
                    icon="file-excel"
                    iconColor={colors.black}
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

                <DataTable style={style.table}>
                  <DataTable.Header>
                    <DataTable.Title
                      style={style.headerCell1}
                      numberOfLines={2}
                    >
                      N°
                    </DataTable.Title>

                    <DataTable.Title style={style.headerCell} numberOfLines={2}>
                      Nombre del producto
                    </DataTable.Title>

                    <DataTable.Title style={style.headerCell} numberOfLines={2}>
                      ID del producto
                    </DataTable.Title>

                    <DataTable.Title style={style.headerCell} numberOfLines={2}>
                      Categoría
                    </DataTable.Title>

                    <DataTable.Title style={style.headerCell} numberOfLines={2}>
                      Marca
                    </DataTable.Title>
                  </DataTable.Header>

                  {filteredProducts
                    .slice(from, to)
                    .map((product, index, array) => (
                      <DataTable.Row
                        key={product.id}
                        style={
                          index === array.length - 1 ? style.lastRow : style.row
                        }
                      >
                        <DataTable.Cell style={style.cell1}>
                          {from + index + 1}
                        </DataTable.Cell>

                        <DataTable.Cell style={style.cell}>
                          {product.name}
                        </DataTable.Cell>

                        <DataTable.Cell style={style.cell}>
                          {product.id}
                        </DataTable.Cell>

                        <DataTable.Cell style={style.cell}>
                          {product.category}
                        </DataTable.Cell>

                        <DataTable.Cell style={style.cell}>
                          {product.brand}
                        </DataTable.Cell>
                      </DataTable.Row>
                    ))}
                </DataTable>

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
