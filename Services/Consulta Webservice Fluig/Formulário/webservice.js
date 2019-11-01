var companyId = 1;
var username = "dev";
var password = "DevAdmin@2019#";

var cardId = 384;
var field = "login";
var value = "Login novo do Victor";

var xmlString = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.dm.ecm.technology.totvs.com/">
<soapenv:Header/>
<soapenv:Body>
   <ws:updateCardData>
      <companyId>${companyId}</companyId>
      <username>${username}</username>
      <password>${password}</password>
      <cardId>${cardId}</cardId>
      <cardData>
         <!--Zero or more repetitions:-->
         <item>
            <!--Optional:-->
            <field>${field}</field>
            <!--Optional:-->
            <value>${value}</value>
         </item>
      </cardData>
   </ws:updateCardData>
</soapenv:Body>
</soapenv:Envelope>`;

WCMAPI.Create({
    url: WCMAPI.serverURL + '/webdesk/ECMCardService?wsdl',
    contentType: 'application/json',
    data: xmlString,
    success: res => console.log('sucesso', res),
    error: res => console.log('erro', res)
});