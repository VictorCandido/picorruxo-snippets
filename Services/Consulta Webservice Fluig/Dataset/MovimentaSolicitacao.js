function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();

    var user = "LOGIN_USUARIO_FLUIG";
    var password = "SENHA";
    var companyId = 1;
    var processInstanceId = 0;
    var choosedState = 0;
    var colleagueIds;
    var comments = '';
    var userId = 'COLLEAGUEID_USUARIO_FLUIG';
    var completeTask = true;
    var attachments;
    var cardData;
    var appointment;
    var managerMode = true;
    var threadSequence = 0;
    
    for(var i in constraints){
        if(constraints[i].fieldName == 'processInstanceId'){
            processInstanceId = constraints[i].initialValue;
        }
    }

    try {
        var service = ServiceManager.getServiceInstance('ECMWorkflowEngineService');
        var engineService = service.instantiate('ECMWorkflowEngineService.ECMWorkflowEngineServiceService');

        var port = engineService.getWorkflowEngineServicePort();

        attachments = service.instantiate('ECMWorkflowEngineService.ProcessAttachmentDtoArray');
        appointment = service.instantiate('ECMWorkflowEngineService.ProcessTaskAppointmentDtoArray');
        colleagueIds = service.instantiate('ECMWorkflowEngineService.StringArray');
        cardData = service.instantiate('ECMWorkflowEngineService.KeyValueDtoArray');

        var ActiveStatesResult = port.getAllActiveStates(user, password, companyId, userId, processInstanceId);
        var activeState = ActiveStatesResult.getItem().get(ActiveStatesResult.getItem().size() - 1);
        
        var threadSequence = port.getActualThread(user, password, companyId, processInstanceId, activeState);

        var result = port.saveAndSendTaskClassic(user, password, companyId, processInstanceId, choosedState, colleagueIds, comments, 
            userId, completeTask, attachments, cardData, appointment, managerMode, threadSequence);

        dataset.addColumn('result');
        dataset.addRow([result.toString()]);
    } catch (error) {
        dataset.addColumn('Erro');
        dataset.addRow([error.toString()]);
    }
    return dataset;
}