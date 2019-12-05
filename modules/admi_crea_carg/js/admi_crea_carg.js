var admi_crea_carg_nomb_cont="admi_crea_carg/main/";
var admi_crea_carg_esta_form=0;
function admi_crea_carg() {
    
    //oculta el menu y oculta los iconos.
    document.getElementById("mySidenav").style.width = "0px";
    document.getElementById("main").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    jQuery.ajaxSetup({async:true});
    jQuery.post(
      admi_crea_carg_nomb_cont+"crea_carg",{
            cache : Math.random()
        }  , function (html) {
            jQuery("#admi_crea_carg_tabl").remove();
            jQuery("#admi_crea_carg_deta_tabl").remove();
            jQuery("#mainContenido").html(html);

            jQuery("#admi_crea_carg_tabl").jqxWindow({
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
            jQuery("#admi_crea_carg_deta_tabl").jqxWindow({
                autoOpen: false,
                width: jQuery(window).width()-180, 
                maxWidth: 1500,
                height : jQuery(window).height()-180,
                showCollapseButton: true ,
                theme: tema,
                resizable: false,
                isModal: true,
                draggable: true,
                showCloseButton: true,
                dragArea: {left: 0, top:80, width: jQuery(window).width(), height: jQuery(window).height()-80}
            });
            jQuery('#admi_crea_carg_deta_tabl').on('open',function (event) {
               jQuery('#admi_crea_carg_deta_tabl').jqxWindow('bringToFront');
            });
            jQuery('#admi_crea_carg_tabl').jqxWindow('open');
            jQuery('#admi_crea_carg_tabl').jqxWindow({content: 'CARGANDO ... '});
            admi_crea_carg_form();
        }

    );
}
function admi_crea_carg_form() {
    jQuery.ajaxSetup({async:true});
    jQuery.post(
          admi_crea_carg_nomb_cont+"crea_carg_form",{
            cache:Math.random()
        },function (html) {
            jQuery('#admi_crea_carg_tabl').jqxWindow({content:html});
            jQuery('#admi_crea_carg_tabl').on('close' , function (event) {
               jQuery("head  script:last-child").remove();
            });
            jQuery("#admi_crea_carg_btn_regi,#admi_crea_carg_btn_limp,#admi_crea_carg_btn_cerr").jqxButton({
                width       : 120,
                height      : 30,
                theme       : tema

            });
            jQuery("#admi_crea_carg_txt_codi_carg").focus();
            jQuery("#admi_crea_carg_txt_codi_carg").jqxInput({
                height      : 24,
                width       : 40,
                theme       : tema,
                disabled    : true
            });
            jQuery("#admi_crea_carg_txt_nomb_carg").jqxInput({
                height      : 24,
                width       : 320,
                theme       : tema,
                disabled    : false
            });
            var admi_crea_carg_txt_esta =  new Array("ACT","INA");
            jQuery("#admi_crea_carg_txt_esta").jqxDropDownList({
                source : admi_crea_carg_txt_esta,
                dropDownHeight: 70,
                theme       : tema ,
                disabled    : false,
                width       : 100,
                height      : 24,
                selectedIndex   : 0
            });
            jQuery("#admi_crea_carg_btn_busq").click(function(){
                
                admi_crea_carg_deta_form();
            });

            jQuery("#admi_crea_carg_txt_codi_carg").change(function(){
                jQuery("#admi_crea_carg_lbl_mens").html('');
                if(jQuery.trim(jQuery("#admi_crea_carg_txt_codi_carg").val())!=""){
                    jQuery.ajaxSetup({async:true});
                    jQuery.post(
                            admi_crea_carg_nomb_cont+"carg_list",{
                                cache       : Math.random(),
                                cons_carg  : jQuery.trim(jQuery("#admi_crea_carg_txt_codi_carg").val())
                            },function(html){
                                if(html.mensaje!==""){
                                    jQuery("#admi_crea_carg_lbl_mens").html(html.mensaje);
                                }else{
                                    if(html.data.length > 0){
                                        admi_crea_carg_esta_form = 1;
                                        jQuery("#admi_crea_carg_txt_nomb_carg").val(html.data[0].nomb_carg);
                                        if(html.data[0].acti_carg == "INA"){
                                            jQuery("#admi_crea_carg_txt_esta").jqxDropDownList({selectedIndex:1 });
                                        }else{
                                            jQuery("#admi_crea_carg_txt_esta").jqxDropDownList({selectedIndex:0 });
                                        }
                                    }
                                }
                            }, "json")
                        .fail( function(xhr, textStatus, errorThrown) {
                            
                            main_erro("jQuery('#admi_crea_carg_txt_codi_carg').change(function())",admi_crea_carg_nomb_cont+"carg_list", xhr.responseText,jQuery("#codi_usua").html())
                            jQuery("#admi_crea_carg_lbl_mens").html('* SU MENSAJE DE ERROR A SIDO ENVIADO A SISTEMAS.');
                        });
                }else{
                    jQuery("#admi_crea_carg_lbl_mens").html('');
                    jQuery("#admi_crea_carg_txt_nomb_carg").val('');
                    admi_crea_carg_esta_form = 0;
                    jQuery("#admi_crea_carg_txt_esta").jqxDropDownList({selectedIndex: 0 });
                    jQuery("#admi_crea_carg_txt_codi_carg").focus();
                }
            });
            jQuery("#admi_crea_carg_btn_limp").click(function(){
                admi_crea_carg_limp();
            });
            jQuery("#admi_crea_carg_btn_cerr").click(function(){

                jQuery('#admi_crea_carg_tabl').jqxWindow('close',function (event) {
                    jQuery('#admi_crea_carg_deta_tabl').jqxWindow('close');
                });

            });
            jQuery("#admi_crea_carg_btn_ayud").click(function(){
                   admi_crea_carg_pdf();
            });
            jQuery('#admi_crea_carg_tabl').on('close', function (event) {

                jQuery('#admi_crea_carg_deta_tabl').jqxWindow('close');

            });
            jQuery("#admi_crea_carg_btn_regi").click(function(){
                jQuery.ajaxSetup({async:false});
                jQuery.post(
                        admi_crea_carg_nomb_cont+"crea_carg_regi",{
                            cache       : Math.random(),
                            tipo_carg   : admi_crea_carg_esta_form,
                            codi_carg  : jQuery.trim(jQuery("#admi_crea_carg_txt_codi_carg").val()),
                            nomb_carg   : jQuery.trim(jQuery("#admi_crea_carg_txt_nomb_carg").val()),
                            acti_carg   : jQuery.trim(jQuery("#admi_crea_carg_txt_esta").val())
                        },function(html){
                            if(html.mensaje!==""){
                                jQuery("#admi_crea_carg_lbl_mens").html(html.mensaje);
                            }else{
                                admi_crea_carg_limp();
                                jQuery("#admi_crea_carg_lbl_mens").html('* REGISTRO SATISFACTORIO.');
                            }
                        }, "json")
                    .fail( function(xhr, textStatus, errorThrown) {
                        main_erro("jQuery('#admi_crea_carg_btn_regi').click(function())",admi_crea_carg_nomb_cont+"crea_carg_regi", xhr.responseText,jQuery("#codi_usua").html())
                        jQuery("#admi_crea_carg_lbl_mens").html('* SU MENSAJE DE ERROR A SIDO ENVIADO A SISTEMAS.');
                    });
            });
        }

    );

}
function admi_crea_carg_limp(){
    jQuery("#admi_crea_carg_txt_codi_carg").val('');
}
function admi_crea_carg_list(){
    jQuery('#admi_crea_carg_deta_gril').jqxGrid('clearselection');
    jQuery('#admi_crea_carg_deta_gril').jqxGrid('showloadelement');
    jQuery("#admi_crea_carg_deta_gril").jqxGrid('refresh');
    jQuery("#admi_crea_carg_deta_list_lbl_mens").html('');
    jQuery.ajaxSetup({async:true});
    jQuery.post(
            admi_crea_carg_nomb_cont+"carg_list",{
                cache       : Math.random(),
                cons_carg  : ""
            },function(html){
                if(html.mensaje!==""){
                    jQuery('#admi_crea_carg_deta_gril').jqxGrid('hideloadelement');
                    jQuery("#admi_crea_carg_deta_list_lbl_mens").html(html.mensaje);
                }else{
                    if(html.data.length > 0){
                        var sour_cons_cand =
                        {
                            datatype: "json",
                            datafields: [
                                {name: 'codi_carg', type: 'string'},
                                {name: 'nomb_carg', type: 'string'},
                                {name: 'acti_carg', type: 'string'}
                            ],
                            localdata: html.data
                        };
                        var dataAdapter = new jQuery.jqx.dataAdapter(sour_cons_cand);
                        jQuery("#admi_crea_carg_deta_gril").jqxGrid(
                            {
                                source: dataAdapter
                            });
                    }else{
                        jQuery('#admi_crea_carg_deta_gril').jqxGrid('hideloadelement');
                        jQuery("#admi_crea_carg_deta_list_lbl_mens").html('* LISTA VACIA.');
                    }
                }
            }, "json")
        .fail( function(xhr, textStatus, errorThrown) {
            jQuery('#admi_crea_carg_deta_gril').jqxGrid('hideloadelement');

            main_erro("admi_crea_carg_list()",admi_crea_carg_nomb_cont+"carg_list", xhr.responseText,jQuery("#codi_usua").html())
            jQuery("#admi_crea_carg_deta_list_lbl_mens").html('* SU MENSAJE DE ERROR A SIDO ENVIADO A SISTEMAS.');
        });
}

function admi_crea_carg_deta_form(){
    jQuery('#admi_crea_carg_deta_tabl').jqxWindow('open');
    jQuery('#admi_crea_carg_deta_tabl').jqxWindow({content: 'CARGANDO ... '}); 
    jQuery.ajaxSetup({async:true});
    jQuery.post(
        admi_crea_carg_nomb_cont+"crea_carg_deta_form",{
            cache   : Math.random()
        },function(html){
            jQuery('#admi_crea_carg_deta_tabl').jqxWindow({content: html}); 
            var admi_crea_carg_data_cons = new Array();
            var admi_crea_carg_sour_cons =
            {
                localdata: admi_crea_carg_data_cons,
                datatype: "array",
                datafields:
                    [
                        {name: 'codi_carg', type: 'string'},
                        {name: 'nomb_carg', type: 'string'},
                        {name: 'acti_carg', type: 'string'}
                    ]
            };
           var admi_crea_carg_data_adap_cons = new jQuery.jqx.dataAdapter(admi_crea_carg_sour_cons);
            jQuery("#admi_crea_carg_deta_gril").jqxGrid(
                {
                    width: jQuery("#admi_crea_carg_deta_tabl").width() - 10,
                    height: jQuery("#admi_crea_carg_deta_tabl").height() - 80,
                    theme: tema,
                    source: admi_crea_carg_data_adap_cons,
                    columnsresize: true,
                    sortable: true,
                    filterable: true,
                    altrows: true,
                    showemptyrow: false,
                    columnsreorder: true,
                    columns: [
                        {text: 'CODIGO', dataField: 'codi_carg',width:100},
                        {text: 'NOMBRE', dataField: 'nomb_carg'},
                        {text: 'ESTADO', dataField: 'acti_carg',width:100}
                    ]
                });
            jQuery("#admi_crea_carg_deta_gril").jqxGrid('localizestrings', localizationobj);
            jQuery('#admi_crea_carg_deta_gril').on('rowselect', function (event)
            {
                var args = event.args;
                var row = args.rowindex;
                var dataRecord = jQuery("#admi_crea_carg_deta_gril").jqxGrid('getrowdata', row);
                jQuery('#admi_crea_carg_deta_tabl').jqxWindow('close');
                jQuery("#admi_crea_carg_txt_codi_carg").val(dataRecord.codi_carg);

            });
            admi_crea_carg_list();
        }
    );
}

function admi_crea_carg_pdf() {
    
    var arch_ayud = "crearCriticidad.pdf";
   
    window.open(link+"mantenimiento/" + arch_ayud, "_blank ", "top=1, left=1, width=1000, height=700,location=0,status=0,resizable=1, scrollbars=1");
}