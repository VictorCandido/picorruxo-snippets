
function createDataset(fields, constraints, sortFields) {
    

    var dataset = DatasetBuilder.newDataset();
    dataset.addColumn('result');


    var user = "USUÁRIO LOGIN DO FLUIG"
    var password = "SUA SENHA DO FLUIG"
    var companyId = 1
    var processInstanceId = 0
    var userId = 'USUÁRIO DO COLLEAGUEID'
    var cancelText = 'TEXTO PARA CANCELAR'


    for(var i in constraints){
        if(constraints[i].fieldName == 'processoId'){
            processInstanceId = constraints[i].initialValue;
        }
    }

    
    try {
        var service = ServiceManager.getServiceInstance('ECMWorkflowEngineService');
        var engineService = service.instantiate('com.totvs.technology.ecm.workflow.ws.ECMWorkflowEngineServiceService');
                                                
        var port = engineService.getWorkflowEngineServicePort();

        attachments = service.instantiate('com.totvs.technology.ecm.workflow.ws.ProcessAttachmentDtoArray');
        appointment = service.instantiate('com.totvs.technology.ecm.workflow.ws.ProcessTaskAppointmentDtoArray');
        colleagueIds = service.instantiate('net.java.dev.jaxb.array.StringArray');
        cardData = service.instantiate('com.totvs.technology.ecm.workflow.ws.KeyValueDtoArray');

        var ActiveStatesResult = port.getAllActiveStates(user, password, companyId, userId, processInstanceId);
        var activeState = ActiveStatesResult.getItem().get(ActiveStatesResult.getItem().size() - 1);
        
        var threadSequence = port.getActualThread(user, password, companyId, processInstanceId, activeState);

        // var result = port.saveAndSendTaskClassic(user, password, companyId, processInstanceId, choosedState, colleagueIds, comments, 
        //     userId, completeTask, attachments, cardData, appointment, managerMode, threadSequence);
        
        var result = port.cancelInstance(user, password, companyId, processInstanceId, userId, cancelText);

        dataset.addRow(["Instancia cancelada: " + processInstanceId]);
        dataset.addRow([result.toString()]);
    } catch (error) {
        dataset.addRow(["Resultado com erro"]);
        dataset.addRow([error.toString()]);
    }

    return dataset;


}