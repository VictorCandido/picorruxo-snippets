function servicetask27(attempt, message) {
    try {
        var clientService = fluigAPI.getAuthorizeClientService();
        var data = {
            companyId:          getValue("WKCompany") + '',
            serviceCode:        '', //  Nome do serviço cadastrado no Fluig
            endpoint:           '', //  Url que vem depois do domínio "/ecm/teste/etc"
            method:             'post', // 'delete', 'patch', 'put', 'get'     
            timeoutService:     '100', // segundos
            params : {},    //  Parametros da API
            options: {
                encoding:       'UTF-8',
                mediaType:      'application/json'
            },
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        }

        /* EXEMPLO DE CONSUMO DO RETORNO DA API */
        var gson = new com.google.gson.Gson();
        var vo = clientService.invoke(gson.toJson(data));

        var result = vo.getResult();

        log.info('RESULT ========> ' + result);

        for( key in result) {
            log.info('=====> '+ result[key])
        }
        
        if (vo.getResult() == null || vo.getResult().isEmpty()) {
            return false;
        } else {
            if(result.errorCode != undefined){
                throw "Falha na implementação com o Protheus: " + result.errorMessage;
            }else{
                return true;
            }
        }
    } catch (error) {
        throw "Erro: " + error;
    }
}