function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();

    var username = "dev";
    var password = "DevAdmin@2019#";
    var companyId = 1;

    var colleagueId = "";
    var colleagueName = "";
    var login = "";
    var email = "";
    var passwd = "";


    for(var i in constraints) {
        if (constraints[i]['fieldName'] == "colleagueId") {
            colleagueId = constraints[i]['initialValue'];
        }
        if (constraints[i]['fieldName'] == "colleagueName") {
            colleagueName = constraints[i]['initialValue'];
        }
        if (constraints[i]['fieldName'] == "login") {
            login = constraints[i]['initialValue'];
        }
        if (constraints[i]['fieldName'] == "email") {
            email = constraints[i]['initialValue'];
        }
        if (constraints[i]['fieldName'] == "passwd") {
            passwd = constraints[i]['initialValue'];
        }
    }


    try {
        var service = ServiceManager.getService("ECMColleagueService");
        var serviceClass = service.instantiate("com.totvs.technology.ecm.foundation.ws.ECMColleagueServiceService");

        var colleagueDtoArray = service.instantiate("com.totvs.technology.ecm.foundation.ws.ColleagueDtoArray");
        var colleagueDto = service.instantiate("com.totvs.technology.ecm.foundation.ws.ColleagueDto");

        colleagueDto.setColleagueId(colleagueId);
        colleagueDto.setColleagueName(colleagueName);
        colleagueDto.setCompanyId(companyId);
        colleagueDto.setLogin(login);
        colleagueDto.setMail(email);
        colleagueDto.setPasswd(passwd);

        colleagueDtoArray.getItem().add(colleagueDto);

        var servicePort = serviceClass.getColleagueServicePort();

        var response = servicePort.createColleague(username, password, companyId, colleagueDtoArray);

        dataset.addColumn('Response');
        dataset.addRow([response.toString()]);

    } catch (error) {
        dataset.addColumn('Erro');
        dataset.addRow([error.toString()]);
    }

    return dataset;
}