function showIsoName() {
          var api = parent.pluginApi('IsoUploader');
          var userNameWithDomain = api.loginUserName();
          if(userNameWithDomain != "admin@internal-authz"){
              if(lang == 'zh_CN'){
                  alert("您没有权限执行此功能！！！");
              }
              else{
                  alert("You have no the permission of this function!");
              }
              var disableselect = document.getElementById("upload");
              disableselect.disabled = "true";
              return ;
          }
          $.ajax({
            type: "GET",
            url: "/ovirt-engine/api/storagedomains/?search=status%3Dactive",
            headers: {"Content-Type":"application/xml",
                      "Prefer":"persistent-auth",
                     },
            success: function(data) {
              //var oSerializer = new XMLSerializer();
              //var getXMLString = oSerializer.serializeToString(data);
              //alert(getXMLString);
              var j = 0;
              var isoName = new Array();
              var isoNameXML = data.getElementsByTagName("name");
              var isoTypeXML=data.getElementsByTagName("type");
              var getIsoName=new Array(isoNameXML.length);
              var getIsoType=new Array(isoTypeXML.length);
              for(var i=0;i<isoNameXML.length;i++){
                 getIsoName[i]=isoNameXML[i].childNodes[0].data;
              }
              //alert(getIsoName.join());
              for(var i=0;i<isoTypeXML.length;i=i+2){
                 if(isoTypeXML[i].childNodes[0].data=="iso"){
                     isoName[j] = getIsoName[i/2];
                     j++;
                 }
              }
              //alert(isoName.join());
              if(lang == 'zh_CN'){
                  selectid.options[0] = new Option("请选择存储域",2);
              }
              else{
                  selectid.options[0] = new Option("Choice Domain",2);
              }
              for(var i = 0;i < isoName.length;i++){
                 selectid.options[i+1] = new Option(isoName[i],isoName[i]);
              }
            }
          });
}


    function servletGetIsoName(){
        var str = $("#selectid option:selected").val();   //获得选中的值
        $.ajax({
            type:"post",
            url:"/iso-uploader-plugin/GetIsoDomain",
             dataType: "json",
            //headers: {"Content-Type":"application/json"},
            data:{'selectname':str},
            success:function(msg){
                if(msg){
                    alert(msg);
                }
            }
        });
    }

