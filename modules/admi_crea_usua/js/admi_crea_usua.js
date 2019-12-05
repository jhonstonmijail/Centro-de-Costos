var admi_crea_usua_nomb_cont = "admi_crea_usua/main/";
var admi_crea_usua_esta_form = 0;
function admi_crea_usua(){
    //oculta el menu y oculta los iconos.
    document.getElementById("mySidenav").style.width = "0px";
    document.getElementById("main").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    jQuery.ajaxSetup({async:true});
    jQuery.post(
        admi_crea_usua_nomb_cont+"admi_crea_usua",{
            cache   : Math.random()
        },function(html){
            jQuery("#admi_crea_usua_tabl").remove();
            jQuery("#admi_crea_usua_tabl_deta").remove();
            jQuery("#mainContenido").html(html);
            
            jQuery("#admi_crea_usua_tabl").jqxWindow({ 
                autoOpen: false,
                width: jQuery(window).width()-120, 
                height : jQuery(window).height()-150,
                showCollapseButton: true ,
                theme: tema,
                resizable: false,
                draggable: true,
                showCloseButton: true,
                dragArea: {left: 0, top:80, width: jQuery(window).width(), height: jQuery(window).height()-80}
            });
              jQuery("#admi_crea_usua_tabl_deta").jqxWindow({ 
                autoOpen: false,
                width: jQuery(window).width()-180, 
                maxWidth: 1500,
                height : jQuery(window).height()-180,
                showCollapseButton: false ,
                theme: tema,
                resizable: false,
                draggable: true,
                showCloseButton: true,
                isModal: true,
                dragArea: {left: 0, top:80, width: jQuery(window).width(), height: jQuery(window).height()-80}
            });
            jQuery('#admi_crea_usua_tabl').jqxWindow('open');
            jQuery('#admi_crea_usua_tabl').jqxWindow({content: 'CARGANDO ... '}); 
            admi_crea_usua_form();
        }
    );   
}  
function admi_crea_usua_form(){
    jQuery.ajaxSetup({async:true});
    jQuery.post(
        admi_crea_usua_nomb_cont+"admi_crea_usua_form",{
            cache   : Math.random()
        },function(html){
            jQuery('#admi_crea_usua_tabl').jqxWindow({content: html}); 
            
            jQuery("#admi_crea_usua_tabl").on('close', function (event) { 
                jQuery("head script:last-child").remove();                
            });
            
            jQuery("#admi_crea_usua_btn_regi,#admi_crea_usua_btn_limp,#admi_crea_usua_btn_cerr").jqxButton({ 
                width: '100', 
                height: '26',
                theme: tema 
            });    
            jQuery("#admi_crea_usua_txt_nume_iden").jqxInput({ 
                height: 22, 
                width: 200,
                theme: tema
            });
            jQuery("#admi_crea_usua_txt_nomb_usua").jqxInput({ 
                height: 22, 
                width: 240,
                theme: tema
            });
            jQuery("#admi_crea_usua_txt_apel_usua").jqxInput({ 
                height: 22, 
                width: 240,
                theme: tema
            });
            jQuery("#admi_crea_usua_txt_fech_usua").jqxDateTimeInput({
                width: 240,
                height: 24,
                theme: tema,
                formatString: 'yyyy/MM/dd',
                readonly: true,
                disabled: false
        });
            jQuery("#admi_crea_usua_txt_area_usua").jqxDropDownList({
                theme: tema,
                width: 240,
                height: 24,
                placeHolder: "AREA",
                selectedIndex: -1,
                valueMember: "codi_area",
                displayMember: 'desc_area',
                dropDownHeight: 85
        });
         admi_crea_usua_area_list();
         jQuery("#admi_crea_usua_txt_carg_usua").jqxDropDownList({
            theme: tema,
            width: 240,
            height: 24,
            placeHolder: "CARGO",
            selectedIndex: -1,
            valueMember: "codi_carg",
            displayMember: 'desc_carg',
            dropDownHeight: 85
        });
           admi_crea_usua_carg_list();
         
         jQuery("#admi_crea_usua_txt_perf_usua").jqxDropDownList({
            theme: tema,
            width: 240,
            height: 24,
            placeHolder: "PERFIL",
            selectedIndex: -1,
            valueMember: "codi_perf",
            displayMember: 'desc_perf',
            dropDownHeight: 85
        });
         admi_crea_usua_perf_list();
            jQuery("#admi_crea_usua_txt_usua").jqxInput({ 
                height: 22, 
                width: 240,
                theme: tema
            });
            jQuery("#admi_crea_usua_txt_clav_usua").jqxInput({ 
                theme: tema,
                width: 240, 
                height: 22
             
            });
          jQuery("#admi_crea_usua_txt_repe_clav_usua").jqxInput({ 
                theme: tema,
                width: 240, 
                height: 22
             
            });
           
            jQuery("#admi_crea_usua_txt_corr_usua").jqxInput({ 
                height: 22, 
                width: 240,
                theme: tema,
                disabled:false
            });
            
            jQuery("#admi_crea_usua_txt_telf_usua").jqxInput({ 
                height: 22, 
                width: 240,
                theme: tema,
                disabled:false
            });
        
           var admi_crea_usua_esta_usua =  new Array("ACT","INA");
           jQuery("#admi_crea_usua_txt_esta_usua").jqxDropDownList({
                source : admi_crea_usua_esta_usua,
                dropDownHeight: 70,
                theme       : tema ,
                disabled    : false,
                width       : 240,
                height      : 22,
                selectedIndex   : 0
            });

           
           
            jQuery("#admi_crea_usua_btn_limp").click(function(){
                jQuery("#admi_crea_usua_txt_nume_iden").val('');
                jQuery("#admi_crea_usua_txt_nomb_usua").val('');
                jQuery("#admi_crea_usua_txt_apel_usua").val('');
                
                
                jQuery("#admi_crea_usua_txt_usua").val('');
                jQuery("#admi_crea_usua_txt_usua").jqxInput({
                    disabled : false
                });
                jQuery("#admi_crea_usua_txt_clav_usua").val('');
                jQuery("#admi_crea_usua_txt_repe_clav_usua").val('');
                jQuery("#admi_crea_usua_txt_esta_usua").jqxDropDownList({selectedIndex:0});
                jQuery("#admi_crea_usua_txt_area_usua").jqxDropDownList({selectedIndex:-1});
                jQuery("#admi_crea_usua_txt_carg_usua").jqxDropDownList({selectedIndex:-1});
                jQuery("#admi_crea_usua_txt_perf_usua").jqxDropDownList({selectedIndex:-1});
                jQuery("#admi_crea_usua_txt_corr_usua").val('');
                jQuery("#admi_crea_usua_txt_fech_usua").val(fech_actu);
                jQuery("#admi_crea_usua_txt_telf_usua").val('');
                jQuery("#admi_crea_usua_lbl_mens").html('');
                admi_crea_usua_esta_form = 0;
                jQuery("#admi_crea_usua_txt_nume_iden").focus();
            });
            jQuery("#admi_crea_usua_btn_regi").click(function(){
                admi_crea_usua_regi();
            });
            
            jQuery("#admi_crea_usua_btn_cerr").click(function(){
                jQuery('#admi_crea_usua_tabl').jqxWindow('close');
            });
            jQuery("#admi_crea_usua_btn_busq").click(function(){
                  admi_crea_usua_deta_form();
            });
            jQuery("#admi_crea_usua_btn_ayud").click(function(){
                   admi_crea_usua_pdf();
            });
           
            //Soluciona bug
            jQuery("#admi_crea_usua_txt_nume_iden").unbind('change');
            //solucion
            jQuery("#admi_crea_usua_txt_nume_iden").change(function(){
                if(jQuery.trim(jQuery("#admi_crea_usua_txt_nume_iden").val())==""){
                    
            
                jQuery("#admi_crea_usua_txt_nume_iden").focus();
                }else{
                    admi_crea_usua_nume_iden();
                }
            });
            jQuery("#admi_crea_usua_txt_nume_iden").focus();
        }
    );
}

function admi_crea_usua_deta_form(){
    jQuery('#admi_crea_usua_tabl_deta').jqxWindow('open');
    jQuery('#admi_crea_usua_tabl_deta').jqxWindow({content: 'CARGANDO ... '}); 
    jQuery.ajaxSetup({async:true});
    jQuery.post(
        admi_crea_usua_nomb_cont+"admi_crea_usua_deta_form",{
            cache   : Math.random()
        },function(html){
            jQuery('#admi_crea_usua_tabl_deta').jqxWindow({content: html}); 

        jQuery("#admi_crea_usua_btn_exce").jqxButton({
            width: 100,
            height: 30,
            theme: tema
        });
            var admi_crea_usua_data_arra = new Array();
            var admi_crea_usua_data_sour =
            {
                localdata: admi_crea_usua_data_arra,
                datatype: "array",
                datafields:  
                [
                    {name: 'nume_iden', type: 'string'},
                    {name: 'nomb_usua', type: 'string'},
                    {name: 'apel_usua', type: 'string'},
                    {name: 'codi_usua', type: 'string'},
                    {name: 'esta_usua', type: 'string'}
            
                ]
            };
            var admi_crea_usua_data_adap = new jQuery.jqx.dataAdapter(admi_crea_usua_data_sour);
            jQuery("#admi_crea_usua_gril").jqxGrid(
            {
                width: jQuery("#admi_crea_usua_tabl_deta").width() - 10,
                height:((jQuery("#admi_crea_usua_tabl_deta").height())) - 150,
                theme: tema,
                source: admi_crea_usua_data_adap,
                columnsresize: true,
                sortable: true,
                filterable: true,
                altrows: true,
                showemptyrow: false,
                columnsreorder: true,               
                columns: [
                  {text: 'DNI', dataField: 'nume_iden'},
                  {text: 'NOMBRES', dataField: 'nomb_usua'},
                  {text: 'APELLIDOS', dataField: 'apel_usua',width:180},
                  {text: 'USUARIO', dataField: 'codi_usua'},
                  {text: 'ESTADO', dataField: 'esta_usua',width:60}
                ]
            });
            jQuery("#admi_crea_usua_gril").jqxGrid('localizestrings', localizationobj);
            jQuery('#admi_crea_usua_gril').on('rowselect', function (event) 
            {
                var args = event.args; 
                var row = args.rowindex;
                var dataRecord = jQuery("#admi_crea_usua_gril").jqxGrid('getrowdata', row);
                jQuery('#admi_crea_usua_tabl_deta').jqxWindow('close');
                jQuery("#admi_crea_usua_txt_nume_iden").val(dataRecord.nume_iden);
                //Soluciona bug
              //  jQuery("#admi_crea_usua_empr_txt_nume_iden").unbind('change');
                //solucion
                //jQuery("#admi_crea_usua_empr_txt_nume_iden").trigger("change");
                
            });
            
        jQuery("#admi_crea_usua_btn_exce").click(function () {
            data_info = jQuery('#admi_crea_usua_gril').jqxGrid('getdatainformation');
            data_rows = data_info.rowscount;
            jQuery("#admi_crea_usua_deta_lbl_mens").html("");
            if (data_rows === 0) {
                jQuery("#admi_crea_usua_deta_lbl_mens").html("* UNA LISTA VACIA SIN DATOS NO SE PUEDE  EXPORTAR A EXCEL.");
            } else {
                exce_crea_usua = jQuery("#admi_crea_usua_gril").jqxGrid('exportdata', 'json');
                expo_arch_exce(exce_crea_usua, "REPORTE USUARIOS", true);
            }
        });
            admi_crea_usua_usua_list();
        }
    );
}

function admi_crea_usua_nume_iden(){
    jQuery("#admi_crea_usua_lbl_mens").html('');
    jQuery.ajaxSetup({async:true});
    jQuery.post(
        admi_crea_usua_nomb_cont+"admi_crea_usua_nume_iden",{
            cache       : Math.random(),
            nume_iden   : jQuery.trim(jQuery("#admi_crea_usua_txt_nume_iden").val())
        },function(html){
            if(html.data.length > 0){
                admi_crea_usua_esta_form = 1;
                
                jQuery("#admi_crea_usua_txt_nomb_usua").val(html.data[0].nomb_usua);
                jQuery("#admi_crea_usua_txt_apel_usua").val(html.data[0].apel_usua);
                jQuery("#admi_crea_usua_txt_usua").jqxInput({
                    disabled : true
                });
                jQuery("#admi_crea_usua_txt_usua").val(html.data[0].codi_usua);
                jQuery("#admi_crea_usua_txt_clav_usua").val(html.data[0].clav_usua);
                jQuery("#admi_crea_usua_txt_repe_clav_usua").val(html.data[0].clav_usua);
                jQuery("#admi_crea_usua_txt_corr_usua").val(html.data[0].corr_usua);
                jQuery("#admi_crea_usua_txt_telf_usua").val(html.data[0].telf_usua);
                jQuery("#admi_crea_usua_txt_area_usua").val(html.data[0].area_usua);
                jQuery("#admi_crea_usua_txt_carg_usua").val(html.data[0].carg_usua);
                jQuery("#admi_crea_usua_txt_perf_usua").val(html.data[0].perf_usua);
                jQuery("#admi_crea_usua_txt_fech_usua").val(html.data[0].fech_ingr);
                if(html.data[0].esta_usua == "ACT"){
                    jQuery("#admi_crea_usua_txt_esta_usua").jqxDropDownList({ selectedIndex:0 });
                }else{
                    jQuery("#admi_crea_usua_txt_esta_usua").jqxDropDownList({selectedIndex:1 });
                }
              
               
            }  else{
                jQuery("#admi_crea_usua_txt_nomb_usua").val('');
                jQuery("#admi_crea_usua_txt_apel_usua").val('');
                jQuery("#admi_crea_usua_txt_usua").jqxInput({
                    disabled : false
                });
                jQuery("#admi_crea_usua_txt_usua").val('');
                jQuery("#admi_crea_usua_txt_clav_usua").val('');
                jQuery("#admi_crea_usua_txt_esta_usua").jqxDropDownList({selectedIndex:0});
                jQuery("#admi_crea_usua_txt_corr_usua").val('');
                jQuery("#admi_crea_usua_txt_telf_usua").val('');
                jQuery("#admi_crea_usua_lbl_mens").html('');
                admi_crea_usua_esta_form = 0;
                jQuery("#admi_crea_usua_txt_nomb_usua").focus();
            }        
        }, "json")
    .fail( function(xhr, textStatus, errorThrown) {
        main_erro("admi_crea_usua_nume_iden()",admi_crea_usua_nomb_cont+"admi_crea_usua_nume_iden", xhr.responseText,jQuery("#codi_usua").html())
        jQuery("#admi_crea_usua_lbl_mens").html('* SU MENSAJE DE ERROR A SIDO ENVIADO A SISTEMAS.');
    });
}
function admi_crea_usua_regi(){
    jQuery("#admi_crea_usua_lbl_mens").html('');
    jQuery.ajaxSetup({async:false});
    jQuery.post(
        admi_crea_usua_nomb_cont+"admi_crea_usua_regi",{
            cache   : Math.random(),
            esta_form: admi_crea_usua_esta_form,
            nume_iden : jQuery.trim(jQuery("#admi_crea_usua_txt_nume_iden").val()),
            nomb_usua : jQuery.trim(jQuery("#admi_crea_usua_txt_nomb_usua").val()),
            apel_usua : jQuery.trim(jQuery("#admi_crea_usua_txt_apel_usua").val()),
            codi_usua : jQuery.trim(jQuery("#admi_crea_usua_txt_usua").val()),
            clav_usua : jQuery.trim(jQuery("#admi_crea_usua_txt_clav_usua").val()),
            repe_clav_usua : jQuery.trim(jQuery("#admi_crea_usua_txt_repe_clav_usua").val()),
            esta_usua : jQuery.trim(jQuery("#admi_crea_usua_txt_esta_usua").val()),
            corr_usua : jQuery.trim(jQuery("#admi_crea_usua_txt_corr_usua").val()),
            telf_usua : jQuery.trim(jQuery("#admi_crea_usua_txt_telf_usua").val()),
            fech_ingr : jQuery.trim(jQuery("#admi_crea_usua_txt_fech_usua").val()),
            area_usua : jQuery.trim(jQuery("#admi_crea_usua_txt_area_usua").val()),
            carg_usua : jQuery.trim(jQuery("#admi_crea_usua_txt_carg_usua").val()),
            perf_usua : jQuery.trim(jQuery("#admi_crea_usua_txt_perf_usua").val())
        },function(html){
            if(html.mensaje !=""){
                jQuery("#admi_crea_usua_lbl_mens").html(html.mensaje);
            }else{
                var admi_crea_usua_mens_form = "* ACTUALIZACION SATISFACTORIO.";
                if(admi_crea_usua_esta_form == 0){
                    
                    admi_crea_usua_mens_form = "* REGISTRO SATISFACTORIO.";
                }
                  jQuery("#admi_crea_usua_btn_limp").trigger("click");
                jQuery("#admi_crea_usua_lbl_mens").html(admi_crea_usua_mens_form);
            }           
        }, "json")
    .fail( function(xhr, textStatus, errorThrown) {
        main_erro("admi_crea_usua_regi()",admi_crea_usua_nomb_cont+"admi_crea_usua_regi", xhr.responseText,jQuery("#codi_usua").html())
        jQuery("#admi_crea_usua_lbl_mens").html('* SU MENSAJE DE ERROR A SIDO ENVIADO A SISTEMAS.');
    });
}
function admi_crea_usua_usua_list(){
    jQuery('#admi_crea_usua_gril').jqxGrid('clearselection');
    jQuery('#admi_crea_usua_gril').jqxGrid('showloadelement');
    jQuery("#admi_crea_usua_gril").jqxGrid('refresh');
    jQuery("#admi_crea_usua_deta_lbl_mens").html('');
    jQuery.ajaxSetup({async:true});
    jQuery.post(
        admi_crea_usua_nomb_cont+"admi_crea_usua_usua_list",{
            cache   : Math.random()
        },function(html){
            if(html.mensaje!==""){
                jQuery('#admi_crea_usua_gril').jqxGrid('hideloadelement');
                jQuery("#admi_crea_usua_deta_lbl_mens").html(html.mensaje);
            }else{
                if(html.data.length > 0){
                    var admi_crea_usua_data_sour =
                    {
                        datatype: "json",
                        datafields: [
                            {name: 'nume_iden', type: 'string'},
                            {name: 'nomb_usua', type: 'string'},
                            {name: 'apel_usua', type: 'string'},
                            {name: 'codi_usua', type: 'string'},
                            {name: 'esta_usua', type: 'string'}
                        ],
                        localdata: html.data
                    };
                    var admi_crea_usua_data_adap = new jQuery.jqx.dataAdapter(admi_crea_usua_data_sour);
                    jQuery("#admi_crea_usua_gril").jqxGrid({source: admi_crea_usua_data_adap});
                }else{
                    jQuery('#admi_crea_usua_gril').jqxGrid('hideloadelement');
                    jQuery("#admi_crea_usua_deta_lbl_mens").html('* ERROR LISTA VACIA.');
                }
            }
        }, "json")
    .fail( function(xhr, textStatus, errorThrown) {
        jQuery('#admi_crea_usua_gril').jqxGrid('hideloadelement');
        main_erro("admi_crea_usua_usua_list()",admi_crea_usua_nomb_cont+"admi_crea_usua_usua_list", xhr.responseText,jQuery("#codi_usua").html())
        jQuery("#admi_crea_usua_deta_lbl_mens").html('* SU MENSAJE DE ERROR A SIDO ENVIADO A SISTEMAS.');
    });
}

function admi_crea_usua_pdf() {
    
    var arch_ayud = "creacionUsuario.pdf";
   
    window.open(link+"administracion/" + arch_ayud, "_blank ", "top=1, left=1, width=1000, height=700,location=0,status=0,resizable=1, scrollbars=1");
}


function admi_crea_usua_area_list() {
    jQuery("#admi_crea_usua_lbl_mens").html("");
    jQuery.ajaxSetup({async: true});
    jQuery.post(
            admi_crea_usua_nomb_cont + "crea_usua_area", {
                cache: Math.random()
            }, function (html) {
        if (html.mensaje == "") {
            
                   var sour_codi_area = {
                    datatype: "json",
                    datafields: [
                        {name: 'codi_area', type: 'string'},
                        {name: 'desc_area', type: 'string'}
                    ],
                    localdata: html.data
                 };
                    var data_area = new jQuery.jqx.dataAdapter(sour_codi_area);
                
                    jQuery("#admi_crea_usua_txt_area_usua").jqxDropDownList({
                        selectedIndex: -1,
                        source: data_area,
                        displayMember: "desc_area",
                        valueMember: "codi_area"
                    });
        } else {
            jQuery("#admi_crea_usua_lbl_mens").html(html.mensaje);
        }
    }, "json")
            .fail(function (xhr, textStatus, errorThrown) {
                main_erro("admi_crea_usua_area_list()", admi_crea_usua_nomb_cont + "crea_usua_area", xhr.responseText, jQuery("#codi_usua").html())
                jQuery("#admi_crea_usua_lbl_mens").html('* SU MENSAJE DE ERROR A SIDO ENVIADO A SISTEMAS.');
            });
}

function admi_crea_usua_carg_list() {
    jQuery("#admi_crea_usua_lbl_mens").html("");
    jQuery.ajaxSetup({async: true});
    jQuery.post(
            admi_crea_usua_nomb_cont + "crea_usua_carg", {
                cache: Math.random()
            }, function (html) {
        if (html.mensaje == "") {
            
                   var sour_codi_carg = {
                    datatype: "json",
                    datafields: [
                        {name: 'codi_carg', type: 'string'},
                        {name: 'desc_carg', type: 'string'}
                    ],
                    localdata: html.data
                 };
                    var data_carg = new jQuery.jqx.dataAdapter(sour_codi_carg);
                
                    jQuery("#admi_crea_usua_txt_carg_usua").jqxDropDownList({
                        selectedIndex: -1,
                        source: data_carg,
                        displayMember: "desc_carg",
                        valueMember: "codi_carg"
                    });
        } else {
            jQuery("#admi_crea_usua_lbl_mens").html(html.mensaje);
        }
    }, "json")
            .fail(function (xhr, textStatus, errorThrown) {
                main_erro("admi_crea_usua_carg_list()", admi_crea_usua_nomb_cont + "crea_usua_carg", xhr.responseText, jQuery("#codi_usua").html())
                jQuery("#admi_crea_usua_lbl_mens").html('* SU MENSAJE DE ERROR A SIDO ENVIADO A SISTEMAS.');
            });
}

function admi_crea_usua_perf_list() {
    jQuery("#admi_crea_usua_lbl_mens").html("");
    jQuery.ajaxSetup({async: true});
    jQuery.post(
            admi_crea_usua_nomb_cont + "crea_usua_perf", {
                cache: Math.random()
            }, function (html) {
        if (html.mensaje == "") {
            
                   var sour_codi_perf = {
                    datatype: "json",
                    datafields: [
                        {name: 'codi_perf', type: 'string'},
                        {name: 'desc_perf', type: 'string'}
                    ],
                    localdata: html.data
                 };
                    var data_perf = new jQuery.jqx.dataAdapter(sour_codi_perf);
                
                    jQuery("#admi_crea_usua_txt_perf_usua").jqxDropDownList({
                        selectedIndex: -1,
                        source: data_perf,
                        displayMember: "desc_perf",
                        valueMember: "codi_perf"
                    });
        } else {
            jQuery("#admi_crea_usua_lbl_mens").html(html.mensaje);
        }
    }, "json")
            .fail(function (xhr, textStatus, errorThrown) {
                main_erro("admi_crea_usua_perf_list()", admi_crea_usua_nomb_cont + "crea_usua_perf", xhr.responseText, jQuery("#codi_usua").html())
                jQuery("#admi_crea_usua_lbl_mens").html('* SU MENSAJE DE ERROR A SIDO ENVIADO A SISTEMAS.');
            });
}