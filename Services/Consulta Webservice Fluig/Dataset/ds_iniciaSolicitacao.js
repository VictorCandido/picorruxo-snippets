function createDataset(fields, constraints, sortFields) {
    // Cria o dataset
    var dataset = DatasetBuilder.newDataset();

    var username = "LOGIN_USUARIO_FLUIG" //login do usuário.
    var password = "SENHA" //password: senha do usuário.
    var companyId = 1 //código da empresa.
    var processId = "PROCESSO A SER INICIADO"; //número da solicitação.WF_Orc
    var choosedState = 0; //número da atividade destino.
    var colleagueIds = ''; //usuário que receberá a tarefa.
    var comments = 'Criado pelo sistema'; //comentários.
    var userId = "COLLEAGUEID_FLUIG"; //matrícula do usuário que vai iniciar a solicitação.
    var completeTask = true; //indica se deve completar a tarefa (true) ou somente salvar (false).
    var attachments = null //anexos da solicitação.
    var CardData = null; //dados do registro de formulário.
    var appointment = null; //apontamentos da tarefa.
    var managerMode = true //indica se usuário esta executando a tarefa como gestor do processo.

    try {
        // Obtém a instância do serviço 'WorkflowEngineService'
        var periodicService = ServiceManager.getServiceInstance("ECMWorkflowEngineService");
        var serviceHelper = periodicService.getBean();
        
        // Instancia o serviço
        var serviceLocator = serviceHelper.instantiate("com.totvs.technology.ecm.workflow.ws.ECMWorkflowEngineServiceService");
        var service = serviceLocator.getWorkflowEngineServicePort();

        var attachments = serviceHelper.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessAttachmentDtoArray");
        var appointment = serviceHelper.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessTaskAppointmentDtoArray");
        var colleagueIds = serviceHelper.instantiate('net.java.dev.jaxb.array.StringArray');
        CardData = serviceHelper.instantiate('com.totvs.technology.ecm.workflow.ws.KeyValueDtoArray');

        var startProcessClassic = service.startProcessClassic(username, password, companyId, processId, choosedState, colleagueIds, comments, userId, completeTask, attachments, CardData, appointment, managerMode);

        var labelMsg = startProcessClassic.getItem().get(4).getValue();

        var result = new Array();
        if (labelMsg == "Erro") {
        	
        	log.info('Solicitação com erro');
            var msg = startProcessClassic.getItem().get(0).getValue();

            dataset.addColumn("Erro");
            dataset.addRow(new Array(msg));
        }
        else{
            for (var i = 0; i < startProcessClassic.getItem().size(); i++) {
                dataset.addColumn(startProcessClassic.getItem().get(i).getKey());
            }


            for (var i = 0; i < startProcessClassic.getItem().size(); i++) {
                result.push(startProcessClassic.getItem().get(i).getValue());
            }
        }
        dataset.addRow(result);
    } catch (e) {
    	log.info('Entrou no catch e retornou o erro');
        dataset.addColumn("Erro");
        dataset.addRow(new Array(e.message));
    }

    return dataset;
}
