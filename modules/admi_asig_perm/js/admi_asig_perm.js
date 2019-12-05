var admi_asig_perm_nomb_cont = "admi_asig_perm/main/";
var admi_asig_perm_data_json = {};
function admi_asig_perm(){
    //oculta el menu y oculta los iconos.
    document.getElementById("mySidenav").style.width = "0px";
    document.getElementById("main").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    
    jQuery.ajaxSetup({async:true});
    jQuery.post(
        admi_asig_perm_nomb_cont+"admi_asig_perm",{
            cache   : Math.random()
        },function(html){
            
            jQuery("#admi_asig_perm_tabl").remove();
            jQuery("#mainContenido").html(html);
            jQuery("#admi_asig_perm_tabl").jqxWindow({ 
                autoOpen: false,
                width: jQuery(window).width()-80, 
                maxWidth: 1200,
                height : jQuery(window).height()-150,
                showCollapseButton: true ,
                theme: tema,
                resizable: false,
                draggable: true,
                showCloseButton: true,
                dragArea: {left: 0, top:80, width: jQuery(window).width(), height: jQuery(window).height()-80}
            });
            jQuery('#admi_asig_perm_tabl').jqxWindow('open');
            jQuery('#admi_asig_perm_tabl').jqxWindow({content: 'CARGANDO ... '}); 
           admi_asig_perm_form();
          
        }
    )
    
}
function admi_asig_perm_form(){
    jQuery.ajaxSetup({async:true});
    jQuery.post(
        admi_asig_perm_nomb_cont+"admi_asig_perm_form",{
            cache   : Math.random()
        },function(html){
            jQuery('#admi_asig_perm_tabl').jqxWindow({content: html}); 
            jQuery("#admi_asig_perm_tabl").on('close', function (event) { 
                jQuery("head script:last-child").remove();                
            });
            jQuery("#admi_asig_perm_btn_regi,#admi_asig_perm_btn_veri,#admi_asig_perm_btn_limp,#admi_asig_perm_btn_cerr").jqxButton({ 
                width: '100', 
                height: '24',
                theme: tema 
            });    

        jQuery("#admi_asig_perm_txt_codi_usua").jqxInput({ 
                height: 22, 
                width: 200,
                theme: tema,
                
            });
            
           admi_asig_perm_usua_list();
            
            jQuery("#admi_asig_perm_btn_cerr").click(function(){
                jQuery('#admi_asig_perm_tabl').jqxWindow('close'); 
            });
            jQuery("#admi_asig_perm_btn_regi").click(function(){
                admi_asig_perm_regi_prog();
            });
            jQuery("#admi_asig_perm_btn_limp").click(function(){
                jQuery('#admi_asig_perm_gril').jqxGrid('clearselection');
                jQuery("#admi_asig_perm_lbl_mens").html("");
                jQuery("#admi_asig_perm_txt_codi_usua").val('');
                jQuery("#admi_asig_perm_txt_codi_usua").focus();
            });
            var admi_perm_data = new Array();
            var admi_perm_sour =
            {
                localdata: admi_perm_data,
                datatype: "array",
                datafields:  
                [
                    {name: 'cons_fila', type: 'string'},
                    {name: 'cons_prog', type: 'string'},
                    {name: 'codi_prog', type: 'string'},
                    {name: 'nomb_prog', type: 'string'},
                    {name: 'ruta_prog', type: 'string'}
                ]
            };
            var admi_perm_adap = new jQuery.jqx.dataAdapter(admi_perm_sour);
            jQuery("#admi_asig_perm_gril").jqxGrid({
                width: jQuery("#admi_asig_perm_tabl").width()-15,
                height: ((jQuery("#admi_asig_perm_tabl").height()))-180,
                theme: tema,
                source: admi_perm_adap,
                columnsresize: false,
                selectionmode: 'checkbox',
                sortable: true,
                filterable: true,
                altrows: true, 
                showemptyrow: false,
                columnsreorder: true,               
                columns: [
                  {text: 'FILA', dataField: 'cons_fila',width:50,groupable: false},
                  {text: 'CONSECUTIVO', dataField: 'cons_prog',groupable: false,hidden:true},
                  {text: 'CODIGO', dataField: 'codi_prog',groupable: false},
                  {text: 'NOMBRE', dataField: 'nomb_prog',groupable: false},
                  {text: 'RUTA', dataField: 'ruta_prog',groupable: false}
                ],
                groupable: true,
                groups: ['ruta_prog'],
                closeablegroups: false,
                showgroupsheader: false
            });
            jQuery("#admi_asig_perm_gril").jqxGrid('localizestrings', localizationobj);
            
            jQuery("#admi_asig_perm_gril").on("groupschanged", function (event) {
                jQuery("#admi_asig_perm_gril").jqxGrid('expandallgroups');
            }); 
            jQuery("#admi_asig_perm_gril").on("sort", function (event) {
                jQuery("#admi_asig_perm_gril").jqxGrid('expandallgroups');
            });  
            jQuery("#admi_asig_perm_gril").on("filter", function (event) {
                jQuery("#admi_asig_perm_gril").jqxGrid('expandallgroups');
            });
             jQuery("#admi_asig_perm_btn_limp").click(function(){
                jQuery('#admi_asig_perm_gril').jqxGrid('clearselection');
                jQuery("#admi_asig_perm_lbl_mens").html("");
                jQuery("#admi_asig_perm_txt_codi_usua").val('');
                jQuery("#admi_asig_perm_txt_codi_usua").focus();
            });
          jQuery("#admi_asig_perm_btn_ayud").click(function(){
                   admi_asig_perm_pdf();
            });
          admi_asig_perm_gene();
          jQuery("#admi_asig_perm_btn_veri").click(function (){
              jQuery('#admi_asig_perm_gril').jqxGrid('clearselection');
              admi_asig_perm_codi_usua();
          });
       
       
        }
    );
}
function admi_asig_perm_gene(){
    jQuery('#admi_asig_perm_gril').jqxGrid('clear');
    jQuery('#admi_asig_perm_gril').jqxGrid('clearselection');
    jQuery('#admi_asig_perm_gril').jqxGrid('showloadelement');
    jQuery("#admi_asig_perm_gril").jqxGrid('refresh');
    jQuery("#admi_asig_perm_lbl_mens").html('');
    
    jQuery.ajaxSetup({async:true});
    jQuery.post(
        admi_asig_perm_nomb_cont+"admi_asig_perm_gene",{
            cache       : Math.random()
        },function(html){
            if(html.mensaje!==""){
                jQuery('#admi_asig_perm_gril').jqxGrid('hideloadelement');
                jQuery("#admi_asig_perm_lbl_mens").html(html.mensaje);
            }else{
                jQuery("#admi_asig_perm_lbl_mens").html('');
                var source =
                {
                    datatype: "json",
                    datafields: [
                        {name: 'cons_fila', type: 'string'},
                        {name: 'cons_prog', type: 'string'},
                        {name: 'codi_prog', type: 'string'},
                        {name: 'nomb_prog', type: 'string'},
                        {name: 'ruta_prog', type: 'string'}
                    ],
                    localdata: html.data
                };                
                var dataAdapter = new $.jqx.dataAdapter(source);
                jQuery("#admi_asig_perm_gril").jqxGrid({
                    source: dataAdapter
                });
                 jQuery('#admi_asig_perm_gril').jqxGrid('addgroup', 'ruta_prog');
                admi_asig_perm_data_json = jQuery("#admi_asig_perm_gril").jqxGrid('exportdata', 'json');
            }
        }, "json")
    .fail( function(xhr, textStatus, errorThrown) {
        jQuery('#admi_asig_perm_gril').jqxGrid('hideloadelement');
        main_erro("admi_asig_perm_gene()",admi_asig_perm_nomb_cont+"admi_asig_perm_gene", xhr.responseText,jQuery("#codi_usua").html())
        jQuery("#admi_asig_perm_lbl_mens").html('* SU MENSAJE DE ERROR A SIDO ENVIADO A SISTEMAS.');
    });
}

function admi_asig_perm_codi_usua(){
    jQuery("#admi_asig_perm_lbl_mens").html("");
    var codi_usua = jQuery.trim(jQuery("#admi_asig_perm_txt_codi_usua").val());
    if(codi_usua===""){
        jQuery('#admi_asig_perm_gril').jqxGrid('clearselection');
        jQuery("#admi_asig_perm_lbl_mens").html("");
        jQuery("#admi_asig_perm_txt_codi_usua").focus();
    }else{
        jQuery.ajaxSetup({async:true});
        jQuery.post(
            admi_asig_perm_nomb_cont+"admi_asig_perm_codi_usua",{
                cache       : Math.random(),
                codi_usua   : jQuery.trim(jQuery("#admi_asig_perm_txt_codi_usua").val())
            },function(html){
                if(html.mensaje!==""){
                    jQuery("#admi_asig_perm_btn_limp").trigger("click");
                    jQuery("#admi_asig_perm_lbl_mens").html(html.mensaje);
                }else{
                    jQuery("#admi_asig_perm_lbl_mens").html("");
                    
                    for(j = 0; j < html.data.length; j++){
                        jQuery.each(jQuery.parseJSON(admi_asig_perm_data_json), function(idx, obj) {
                            if(html.data[j].codi_prog == jQuery.trim(obj.CODIGO) ){
                              
                                jQuery('#admi_asig_perm_gril').jqxGrid('selectrow', idx);
                            }
                        });                       
                    };   

                }
            }, "json")
        .fail( function(xhr, textStatus, errorThrown) {
            main_erro("admi_asig_perm_codi_usua()",admi_asig_perm_nomb_cont+"admi_asig_perm_codi_usua", xhr.responseText,jQuery("#codi_usua").html())
            jQuery("#admi_asig_perm_lbl_mens").html('* SU MENSAJE DE ERROR A SIDO ENVIADO A SISTEMAS.');
        });
    }
}
function admi_asig_perm_regi_prog(){
    jQuery("#admi_asig_perm_lbl_mens").html("");
    var codi_usua = jQuery.trim(jQuery("#admi_asig_perm_txt_codi_usua").val());
    if(codi_usua==""){
        jQuery("#admi_asig_perm_lbl_mens").html("* EL CAMPO USUARIO ES OBLIGATORIO.");
    }else{
        if(jQuery('#admi_asig_perm_gril').jqxGrid('getselectedrowindexes') == ""){
            jQuery("#admi_asig_perm_lbl_mens").html("* ERROR NO A SELECCIONADO A NINGUN PROGRAMA PARA EL REGISTRO.");
        }else{
            admi_asig_perm_elim_usua();
            var inde_arra = [];
            var inde = jQuery('#admi_asig_perm_gril').jqxGrid('getselectedrowindexes');
            var tota_prog = 0 ;
            for(var i = 0; i < inde.length ; i ++){
                var dataRecord = jQuery("#admi_asig_perm_gril").jqxGrid('getrowdata', inde[i]);
                var esta_prod = 0;
                for(var c = 0; c < inde_arra.length ; c ++){
                    if(inde_arra[c] == dataRecord.cons_prog){
                        esta_prod = 1;
                    }
                }
                if(esta_prod == 0){
                    tota_prog = tota_prog + 1;
                    inde_arra.push(dataRecord.cons_prog);
                    
                    admi_asig_perm_codi_prog(dataRecord.cons_prog);
                }
                jQuery("#admi_asig_perm_lbl_mens").html("* ASIGNANDO "+tota_prog+" PROGRAMA(S)");
            }
            jQuery("#admi_asig_perm_txt_codi_usua").val('');
            jQuery("#admi_asig_perm_txt_codi_usua").focus();
            jQuery("#admi_asig_perm_gril").jqxGrid('clearselection');
            jQuery('#admi_asig_perm_gril').jqxGrid('clearfilters');
            jQuery('#admi_asig_perm_gril').jqxGrid('removesort');
            jQuery("#admi_asig_perm_lbl_mens").html("* SE ASIGNO "+inde_arra.length+" PROGRAMAS AL USUARIO."); 
        }
    }
    
}
function admi_asig_perm_elim_usua(){
    jQuery.ajaxSetup({async:false});
    jQuery.post(
        admi_asig_perm_nomb_cont+"admi_asig_perm_elim_usua",{
            cache       : Math.random(),
            codi_usua   : jQuery.trim(jQuery("#admi_asig_perm_txt_codi_usua").val())
        },function(html){
            jQuery("#admi_perm_lbl_mens").html(html.mensaje);
        }, "json")
    .fail( function(xhr, textStatus, errorThrown) {
        main_erro("admi_asig_perm_elim_usua()",admi_asig_perm_nomb_cont+"admi_asig_perm_elim_usua", xhr.responseText,jQuery("#codi_usua").html())
        jQuery("#admi_asig_perm_lbl_mens").html('* SU MENSAJE DE ERROR A SIDO ENVIADO A SISTEMAS.');
    });
}

function admi_asig_perm_usua_list(){
    jQuery.ajaxSetup({async:true});
    jQuery.post(
        admi_asig_perm_nomb_cont+"admi_asig_perm_nomb_usua",{
            cache       : Math.random()
        },function(html){
               
                  
               /* 
               
            var sour_codi_usua = {
                datatype: "json",
                datafields: [
                    {name: 'codi_usua', type: 'string'}
                ],
                localdata: html.data
            };
            var data_codi_usua = new jQuery.jqx.dataAdapter(sour_codi_usua);
           */
         
            for(var c = 0; c < html.data.length ; c ++){
                   
                   var codi_usua = html.data[c].codi_usua;
                   
                    var dataList = document.querySelector('#admi_asig_list_codi_usua'),
                    input = document.querySelector('#admi_asig_perm_txt_codi_usua');
                    var option = document.createElement('option');
                    option.value = codi_usua;
                    dataList.appendChild(option);
                }
             
         
        }, "json")
    .fail( function(xhr, textStatus, errorThrown) {
        main_erro("admi_asig_perm_usua_list()",admi_asig_perm_nomb_cont+"admi_asig_perm_usua_list", xhr.responseText,jQuery("#codi_usua").html())
        jQuery("#admi_asig_perm_lbl_mens").html('* SU MENSAJE DE ERROR A SIDO ENVIADO A SISTEMAS.');
    });
}

function admi_asig_perm_codi_prog(cons_prog){
    jQuery.ajaxSetup({async:false});
    jQuery.post(
        admi_asig_perm_nomb_cont+"admi_asig_perm_codi_prog",{
            cache       : Math.random(),
            cons_prog   : jQuery.trim(cons_prog),
            codi_usua   : jQuery.trim(jQuery("#admi_asig_perm_txt_codi_usua").val())
        },function(html){
            jQuery("#admi_perm_lbl_mens").html(html.mensaje);
        }, "json")
    .fail( function(xhr, textStatus, errorThrown) {
        main_erro("admi_asig_perm_codi_prog()",admi_asig_perm_nomb_cont+"admi_asig_perm_codi_prog", xhr.responseText,jQuery("#codi_usua").html())
        jQuery("#admi_asig_perm_lbl_mens").html('* SU MENSAJE DE ERROR A SIDO ENVIADO A SISTEMAS.');
    });
}

function admi_asig_perm_pdf() {
    
    var arch_ayud = "asignarPermiso.pdf";
   
    window.open(link+"administracion/" + arch_ayud, "_blank ", "top=1, left=1, width=1000, height=700,location=0,status=0,resizable=1, scrollbars=1");
}