sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("revolucao.controller.Main", {
            onInit: function () {
                var ImageList = {
                    Images: [
                        {
                            title: "Google",
                            url: "https://www.google.com"
                        }

                    ]
                };

                var ImageModel = new JSONModel(ImageList);
                this.getView().setModel(ImageModel, "ModeloImagem");
            },
            onPressBuscar: function () {
                //alert("começou a revolução do SAP Fiori!!");
                var oBuscaInput = this.byId("inpValorBusca");
                var sQuery = oBuscaInput.getValue();

                $.ajax({
                    url: "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI",
                    method: "GET",
                    async: true,
                    crossDomain: true,
                    jsonpCallback: "getJSON",
                    contentType: "application/json",
                    headers: {

                        "X-RapidAPI-Host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
                        "X-RapidAPI-Key": "8c65195ce1mshc3ee20d7cd99edfp116562jsn9d23bc39e195"

                    },


                    data: {
                        "q": sQuery,
                        "pageNumber": 1,
                        "pageSize": 30,
                        "autoCorrect": true,
                        "safeSearch": false
                    },

                    success: function (data, textStatus, jqXHR) {
                        //coletar a instancia do json model e seus dados 
                        var oImageModel = this.getView().getModel("ModeloImagem");
                        var oDadosImage = oImageModel.getData();

                        //zerar a lista para exibir novos resultados
                        oDadosImage = {
                            Images: []
                        };
                        oImageModel.setData(oDadosImage);

                        //coletar os resultados da pesquisa
                        var list = data.value;
                        //criar variavel para passar os resultado para o json model
                        var dados;

                        //loop para preencher o jsonmodel
                        for (var i = 0; i < list.length; i++) {
                            dados = list[i];
                            oDadosImage.Images.push(dados);
                        }

                        oImageModel.refresh();

                    }.bind(this),
                    error: function(jqXHR, textStatus, errorThrown){

                    },

                });


            }


        });
    });
