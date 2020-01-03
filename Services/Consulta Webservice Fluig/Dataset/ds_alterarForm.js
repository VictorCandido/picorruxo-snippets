function createDataset(fields, constraints, sortFields) {

    var companyId = 1;
    var user = "USUÁRIO LOGIN DO FLUIG";
    var password = "SUA SENHA DE LOGIN";
    var cardId = 0;

    for (var i in constraints) {
        if (constraints[i].fieldName == 'cardId') {
            cardId = constraints[i].initialValue;
        }
    }

    // Cria o dataset
    var dataset = DatasetBuilder.newDataset();

    var periodicService = ServiceManager.getServiceInstance("ECMCardService");
    var serviceLocator = periodicService.instantiate("com.totvs.technology.ecm.dm.ws.ECMCardServiceService");
    var service = serviceLocator.getCardServicePort();

    try {

        var CardFieldDtoArray = periodicService.instantiate("com.totvs.technology.ecm.dm.ws.CardFieldDtoArray");
        var CardFieldDto = periodicService.instantiate("com.totvs.technology.ecm.dm.ws.CardFieldDto");

        CardFieldDto.setField("foiModificado"); // campo que deseja alterar
        CardFieldDto.setValue("sim"); // valor do campo
        CardFieldDtoArray.getItem().add(CardFieldDto);

        var update = service.updateCardData(companyId, user, password, cardId, CardFieldDtoArray);

        if (update.getItem().get(0).webServiceMessage == "ok") {
            dataset.addColumn("Sucesso");
            dataset.addRow(["Sucesso"]);
        } else {
            dataset.addColumn("Erro2");
            dataset.addRow([update.getItem().get(0).webServiceMessage]);
        }

    } catch (e) {
        dataset.addColumn("Erro1");
        dataset.addRow(new Array(e.toString()));
    }
}