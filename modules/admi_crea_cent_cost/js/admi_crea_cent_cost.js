var admi_crea_cent_cost_nomb_cont = "admi_crea_cent_cost/main/";
var admi_crea_cent_cost_esta_form = 0;

function admi_crea_cent_cost() {

    document.getElementById("mySidenav").style.width = "0px";
    document.getElementById("main").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    jQuery.ajaxSetup({async: true});
    jQuery.post(
            admi_crea_cent_cost_nomb_cont + "admi_crea_cent_cost", {
                cache: Math.random()
            }, function (html) {
        jQuery("#admi_crea_cent_cost_tabl").remove();
        jQuery("#admi_crea_cent_cost_deta_tabl").remove();
        jQuery("#mainContenido").html(html);

        jQuery("#admi_crea_cent_cost_tabl").jqxWindow({
            autoOpen: false,
            width: jQuery(window).width() - 120,
            height: jQuery(window).height() - 150,
            showCollapseButton: true,
            theme: tema,
            resizable: false,
            draggable: true,
            showCloseButton: true,
            dragArea: {left: 0, top: 80, width: jQuery(window).width(), height: jQuery(window).height() - 80}
        });
        jQuery("#admi_crea_cent_cost_deta_tabl").jqxWindow({
            autoOpen: false,
            width: jQuery(window).width() - 180,
            maxWidth: 1500,
            height: jQuery(window).height() - 180,
            showCollapseButton: false,
            theme: tema,
            resizable: false,
            draggable: true,
            showCloseButton: true,
            isModal: true,
            dragArea: {left: 0, top: 80, width: jQuery(window).width(), height: jQuery(window).height() - 80}
        });
        jQuery('#admi_crea_cent_cost_tabl').jqxWindow('open');
        jQuery('#admi_crea_cent_cost_tabl').jqxWindow({content: 'CARGANDO ... '});
        admi_crea_cent_cost_form();
    }
    );
}

function admi_crea_cent_cost_form() {
    jQuery.ajaxSetup({async: true});
    jQuery.post(
            admi_crea_cent_cost_nomb_cont + "admi_crea_cent_cost_form", {
                cache: Math.random()
            }, function (html) {
        jQuery('#admi_crea_cent_cost_tabl').jqxWindow({content: html});

        jQuery("#admi_crea_cent_cost_tabl").on('close', function (event) {
            jQuery("head script:last-child").remove();
        });

        jQuery("#admi_crea_cent_cost_btn_regi,#admi_crea_cent_cost_btn_limp,#admi_crea_cent_cost_btn_cerr").jqxButton({
            width: '100',
            height: '28',
            theme: tema
        });
        jQuery("#admi_crea_cent_cost_txt_codi_cent").jqxInput({
            height: 28,
            width: 140,
            theme: tema
        });
        jQuery("#admi_crea_cent_cost_txt_nomb_cent_cost").jqxInput({
            height: 28,
            width: 240,
            theme: tema
        });



        var admi_crea_cent_cost_esta_cent = new Array("ACT", "INA");
        jQuery("#admi_crea_cent_cost_txt_esta_cent").jqxDropDownList({
            source: admi_crea_cent_cost_esta_cent,
            dropDownHeight: 70,
            theme: tema,
            disabled: false,
            width: 240,
            height: 28,
            selectedIndex: 0
        });



        jQuery("#admi_crea_cent_cost_btn_limp").click(function () {
            jQuery("#admi_crea_cent_cost_txt_codi_cent").val('');
            jQuery("#admi_crea_cent_cost_txt_nomb_cent_cost").val('');
            jQuery("#admi_crea_cent_cost_txt_esta_cent").jqxDropDownList({selectedIndex: 0});
            jQuery("#admi_crea_cent_cost_lbl_mens").html('');
            admi_crea_cent_cost_esta_form = 0;
            jQuery("#admi_crea_cent_cost_txt_codi_cent").focus();
        });
        jQuery("#admi_crea_cent_cost_btn_regi").click(function () {
            admi_crea_cent_cost_regi();
        });

        jQuery("#admi_crea_cent_cost_btn_cerr").click(function () {
            jQuery('#admi_crea_cent_cost_tabl').jqxWindow('close');
        });
        jQuery("#admi_crea_cent_cost_btn_busq").click(function () {
            admi_crea_cent_cost_deta_form();
        });
        jQuery("#admi_crea_cent_cost_btn_ayud").click(function () {
            admi_crea_cent_cost_pdf();
        });


        jQuery("#admi_crea_cent_cost_txt_codi_cent").unbind('change');
/*
        jQuery("#admi_crea_cent_cost_txt_codi_cent").change(function () {
            if (jQuery.trim(jQuery("#admi_crea_cent_cost_txt_codi_cent").val()) == "") {


                jQuery("#admi_crea_cent_cost_txt_codi_cent").focus();
            } else {
                admi_crea_cent_cost_codi_cent();
            }
        });
        */
        jQuery("#admi_crea_cent_cost_txt_codi_cent").focus();
    }
    );
}

function admi_crea_cent_cost_deta_form() {
    jQuery('#admi_crea_cent_cost_deta_tabl').jqxWindow('open');
    jQuery('#admi_crea_cent_cost_deta_tabl').jqxWindow({content: 'CARGANDO ... '});
    jQuery.ajaxSetup({async: true});
    jQuery.post(
            admi_crea_cent_cost_nomb_cont + "admi_crea_cent_cost_deta_form", {
                cache: Math.random()
            }, function (html) {
        jQuery('#admi_crea_cent_cost_deta_tabl').jqxWindow({content: html});

        jQuery("#admi_crea_cent_cost_deta_btn_exce").jqxButton({
            width: 100,
            height: 30,
            theme: tema
        });
        var admi_crea_cent_cost_data_arra = new Array();
        var admi_crea_cent_cost_data_sour =
                {
                    localdata: admi_crea_cent_cost_data_arra,
                    datatype: "array",
                    datafields:
                            [
                                {name: 'codi_cent', type: 'string'},
                                {name: 'nomb_cent', type: 'string'},
                                {name: 'esta_cent', type: 'string'}

                            ]
                };
        var admi_crea_cent_cost_data_adap = new jQuery.jqx.dataAdapter(admi_crea_cent_cost_data_sour);
        jQuery("#admi_crea_cent_cost_deta_gril").jqxGrid(
                {
                    width: jQuery("#admi_crea_cent_cost_deta_tabl").width() - 10,
                    height: ((jQuery("#admi_crea_cent_cost_deta_tabl").height())) - 150,
                    theme: tema,
                    source: admi_crea_cent_cost_data_adap,
                    columnsresize: true,
                    sortable: true,
                    filterable: true,
                    altrows: true,
                    showemptyrow: false,
                    columnsreorder: true,
                    columns: [
                        {text: 'CODIGO', dataField: 'codi_cent', width: 95},
                        {text: 'NOMBRES', dataField: 'nomb_cent'},
                        {text: 'ESTADO', dataField: 'esta_cent', width: 120}
                    ]
                });
        jQuery("#admi_crea_cent_cost_deta_gril").jqxGrid('localizestrings', localizationobj);
        jQuery('#admi_crea_cent_cost_deta_gril').on('rowselect', function (event)
        {
            var args = event.args;
            var row = args.rowindex;
            var dataRecord = jQuery("#admi_crea_cent_cost_deta_gril").jqxGrid('getrowdata', row);
            jQuery('#admi_crea_cent_cost_deta_tabl').jqxWindow('close');
            jQuery("#admi_crea_cent_cost_txt_codi_cent").val(dataRecord.codi_cent);
            jQuery("#admi_crea_cent_cost_txt_nomb_cent_cost").val(dataRecord.nomb_cent);

            if (dataRecord.esta_cent == "ACT") {
                jQuery("#admi_crea_cent_cost_txt_esta_cent").jqxDropDownList({selectedIndex: 0});
            } else {
                jQuery("#admi_crea_cent_cost_txt_esta_cent").jqxDropDownList({selectedIndex: 1});
            }


        });

        jQuery("#admi_crea_cent_cost_deta_btn_exce").click(function () {
            data_info = jQuery('#admi_crea_cent_cost_deta_gril').jqxGrid('getdatainformation');
            data_rows = data_info.rowscount;
            jQuery("#admi_crea_cent_cost_deta_lbl_mens").html("");
            if (data_rows === 0) {
                jQuery("#admi_crea_cent_cost_deta_lbl_mens").html("* UNA LISTA VACIA SIN DATOS NO SE PUEDE  EXPORTAR A EXCEL.");
            } else {
                exce_crea_prov = jQuery("#admi_crea_cent_cost_deta_gril").jqxGrid('exportdata', 'json');
                expo_arch_exce(exce_crea_prov, "REPORTE CENTRO DE COSTOS", true);
            }
        });
        admi_crea_cent_cost_list();
    }
    );
}

function admi_crea_cent_cost_codi_cent() {
    jQuery("#admi_crea_cent_cost_lbl_mens").html('');
    jQuery.ajaxSetup({async: true});
    jQuery.post(
            admi_crea_cent_cost_nomb_cont + "admi_crea_cent_cost_codi_cent", {
                cache: Math.random(),
                codi_cent: jQuery.trim(jQuery("#admi_crea_cent_cost_txt_codi_cent").val())
            }, function (html) {
        if (html.data.length > 0) {
            admi_crea_cent_cost_esta_form = 1;

            jQuery("#admi_crea_cent_cost_txt_codi_cent").val(html.data[0].codi_cent);
            jQuery("#admi_crea_cent_cost_txt_nomb_cent_cost").val(html.data[0].nomb_cent);

            if (html.data[0].esta_cent == "ACT") {
                jQuery("#admi_crea_cent_cost_txt_esta_cent").jqxDropDownList({selectedIndex: 0});
            } else {
                jQuery("#admi_crea_cent_cost_txt_esta_cent").jqxDropDownList({selectedIndex: 1});
            }


        } else {
            jQuery("#admi_crea_cent_cost_txt_nomb_cent_cost").val('');

            jQuery("#admi_crea_cent_cost_txt_esta_cent").jqxDropDownList({selectedIndex: 0});

            jQuery("#admi_crea_cent_cost_lbl_mens").html('');
            admi_crea_cent_cost_esta_form = 0;
            jQuery("#admi_crea_cent_cost_txt_nomb_cent_cost").focus();
        }
    }, "json")
            .fail(function (xhr, textStatus, errorThrown) {
                main_erro("admi_crea_cent_cost_codi_cent()", admi_crea_cent_cost_nomb_cont + "admi_crea_cent_cost_codi_cent", xhr.responseText, jQuery("#codi_usua").html())
                jQuery("#admi_crea_cent_cost_lbl_mens").html('* SU MENSAJE DE ERROR A SIDO ENVIADO A SISTEMAS.');
            });
}

function admi_crea_cent_cost_regi() {
    jQuery("#admi_crea_cent_cost_lbl_mens").html('');
    jQuery.ajaxSetup({async: false});
    jQuery.post(
            admi_crea_cent_cost_nomb_cont + "admi_crea_cent_cost_regi", {
                cache: Math.random(),
                esta_form: admi_crea_cent_cost_esta_form,
                codi_cent: jQuery.trim(jQuery("#admi_crea_cent_cost_txt_codi_cent").val()),
                nomb_cent: jQuery.trim(jQuery("#admi_crea_cent_cost_txt_nomb_cent_cost").val()),
                esta_cent: jQuery.trim(jQuery("#admi_crea_cent_cost_txt_esta_cent").val())
            }, function (html) {
        if (html.mensaje != "") {
            jQuery("#admi_crea_cent_cost_lbl_mens").html(html.mensaje);
        } else {
            var admi_crea_prov_mens_form = "* ACTUALIZACION SATISFACTORIO.";
            if (admi_crea_cent_cost_esta_form == 0) {

                admi_crea_prov_mens_form = "* SE HA REGISTRADO SATISFACTORIAMENTE.";
            }
            jQuery("#admi_crea_cent_cost_btn_limp").trigger("click");
            jQuery("#admi_crea_cent_cost_lbl_mens").html(admi_crea_prov_mens_form);
        }
    }, "json")
            .fail(function (xhr, textStatus, errorThrown) {
                main_erro("admi_crea_cent_cost_regi()", admi_crea_cent_cost_nomb_cont + "admi_crea_cent_cost_regi", xhr.responseText, jQuery("#codi_usua").html())
                jQuery("#admi_crea_cent_cost_lbl_mens").html('* SU MENSAJE DE ERROR A SIDO ENVIADO A SISTEMAS.');
            });
}
function admi_crea_cent_cost_list() {
    jQuery('#admi_crea_cent_cost_deta_gril').jqxGrid('clearselection');
    jQuery('#admi_crea_cent_cost_deta_gril').jqxGrid('showloadelement');
    jQuery("#admi_crea_cent_cost_deta_gril").jqxGrid('refresh');
    jQuery("#admi_crea_cent_cost_deta_lbl_mens").html('');
    jQuery.ajaxSetup({async: false});
    jQuery.post(
            admi_crea_cent_cost_nomb_cont + "admi_crea_cent_cost_list", {
                cache: Math.random()
            }, function (html) {
        if (html.mensaje !== "") {
            jQuery('#admi_crea_cent_cost_deta_gril').jqxGrid('hideloadelement');
            jQuery("#admi_crea_cent_cost_deta_lbl_mens").html(html.mensaje);
        } else {
            if (html.data.length > 0) {
                var admi_crea_cent_cost_data_sour =
                        {
                            datatype: "json",
                            datafields: [
                                {name: 'codi_cent', type: 'string'},
                                {name: 'nomb_cent', type: 'string'},
                                {name: 'esta_cent', type: 'string'}

                            ],
                            localdata: html.data
                        };
                var admi_crea_cent_cost_data_adap = new jQuery.jqx.dataAdapter(admi_crea_cent_cost_data_sour);
                jQuery("#admi_crea_cent_cost_deta_gril").jqxGrid({source: admi_crea_cent_cost_data_adap});
            } else {
                jQuery('#admi_crea_cent_cost_deta_gril').jqxGrid('hideloadelement');
                jQuery("#admi_crea_cent_cost_deta_lbl_mens").html('* ERROR LISTA VACIA.');
            }
        }
    }, "json")
            .fail(function (xhr, textStatus, errorThrown) {
                jQuery('#admi_crea_cent_cost_deta_gril').jqxGrid('hideloadelement');
                main_erro("admi_crea_cent_cost_list()", admi_crea_cent_cost_nomb_cont + "admi_crea_cent_cost_list", xhr.responseText, jQuery("#codi_usua").html())
                jQuery("#admi_crea_cent_cost_deta_lbl_mens").html('* SU MENSAJE DE ERROR A SIDO ENVIADO A SISTEMAS.');
            });
}