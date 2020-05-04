function createDataset(fields, constraints, sortFields) {
    
    var dataset = DatasetBuilder.newDataset();

    var objConsulta;
    var colleagueName = 'Dev';
    
    for (var i in constraints) {
        if (constraints[i]['fieldName'] == 'objConsulta') {
            objConsulta = JSON.parse(constraints[i]['initialValue']);
        }
        if (constraints[i]['fieldName'] == 'colleagueName') {
            colleagueName = constraints[i]['initialValue']
        }
    }

    try {
        
        var username = '';
        var password = '';
        var companyId = 1;
        var processId = '';
        var choosedState = 0;
        var userId = 'Dev';
        var comments = '';
        var completeTask = true;
        var managerMode = true;

        var callService = ServiceManager.getServiceInstance('WorkflowEngineServiceGabriel');
        var serviceLocator = callService.instantiate('com.totvs.technology.ecm.workflow.ws.ECMWorkflowEngineServiceService')
        var service = serviceLocator.getWorkflowEngineServicePort();

        var attachments = callService.instantiate('com.totvs.technology.ecm.workflow.ws.ProcessAttachmentDtoArray');
        var appointment = callService.instantiate('com.totvs.technology.ecm.workflow.ws.ProcessTaskAppointmentDtoArray');

        var colleagueIds = callService.instantiate('net.java.dev.jaxb.array.StringArray');
        colleagueIds.getItem().add(colleagueName);


        var SolicitacaoArmazem = objConsulta.SolicitacaoArmazem;

        for (var i = 0; i < SolicitacaoArmazem.length; i++) {
            var Aprovadores = SolicitacaoArmazem[i].Aprovadores;

            var cardDataArray = callService.instantiate('com.totvs.technology.ecm.workflow.ws.KeyValueDtoArray');
            
            for (var j = 0; j < Aprovadores.length; j++) {
                var cardData = callService.instantiate('com.totvs.technology.ecm.workflow.ws.KeyValueDto');

                cardData.setKey('Aprovadores___' + (j + 1));
                cardData.setValue(Aprovadores[j].Usuario);

                cardDataArray.getItem().add(cardData)
            }
    
            var response = service.startProcessClassic(username, password, companyId, processId, choosedState, colleagueIds, comments, userId, completeTask, attachments, cardDataArray, appointment, managerMode);
    
            var item = response.getItem()
            var row = [];
    
            for (var j = 0; j < item.size(); j++) {
                if (i == 0) {
                    dataset.addColumn(item.get(j).getKey())
                }
                row.push(item.get(j).getValue())
            }
    
            dataset.addRow(row);
        }

    } catch (err) {

        dataset.addColumn('Erro');
        dataset.addRow([ err.toString() ]); 

    }


    return dataset;
}