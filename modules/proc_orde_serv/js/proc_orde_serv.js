var proc_orde_serv_nomb_cont = "proc_orde_serv/main/"

function proc_orde_serv() {
    //oculta el menu y oculta los iconos.
    document.getElementById("mySidenav").style.width = "0px";
    document.getElementById("main").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    jQuery.ajaxSetup({async: true});
    jQuery.post(
            proc_orde_serv_nomb_cont + "orde_serv", {
                cache: Math.random()
            }, function (html) {
        jQuery("#proc_orde_serv_tabl").remove();

        jQuery("#mainContenido").html(html);

        jQuery("#proc_orde_serv_tabl").jqxWindow({
            autoOpen: false,
            width: jQuery(window).width() - 80,
            maxWidth: 1200,
            height: jQuery(window).height() - 150,
            showCollapseButton: true,
            theme: tema,
            resizable: false,
            draggable: true,
            showCloseButton: true,
            dragArea: {left: 0, top: 80, width: jQuery(window).width(), height: jQuery(window).height() - 80}
        });
        /*
         jQuery("#vent_gene_orde_comp_visu_pdff_tabl").jqxWindow({ 
         autoOpen: false,
         width: jQuery(window).width()-10,
         height : jQuery(window).height()-10,
         maxHeight: screen.height,
         maxWidth: screen.width,
         minHeight: 550,
         minWidth: 850,
         showCollapseButton: false ,
         theme: tema,
         resizable: false,
         draggable: true,
         showCloseButton: true,
         isModal : true,
         keyboardNavigation  : false,
         keyboardCloseKey    : ''
         });
         */
        jQuery('#proc_orde_serv_tabl').jqxWindow('open');
        jQuery('#proc_orde_serv_tabl').jqxWindow({content: 'CARGANDO ... '});
        proc_orde_serv_form();
    }
    );
}

function proc_orde_serv_form() {
    jQuery.ajax({async: true});
    jQuery.post(
            proc_orde_serv_nomb_cont + "orde_serv_form", {
                cache: Math.random()

            }, function (html) {
        jQuery('#proc_orde_serv_tabl').jqxWindow({content: html});

        jQuery("#proc_orde_serv_tabl").on('close', function (event) {
            jQuery("head script:last-child").remove();
        });
        jQuery("#proc_orde_serv_btn_gene,#proc_orde_serv_btn_limp,#proc_orde_serv_btn_cerr").jqxButton({
            width: '100',
            height: '24',
            theme: tema
        });

        jQuery("#proc_come_orde_txt_nomb_soli").jqxInput({
            height: 20,
            width: 190,
            theme: tema
        });
        jQuery("#proc_come_orde_txt_corr_soli").jqxInput({
            height: 20,
            width: 190,
            theme: tema
        });
        jQuery("#proc_come_orde_txt_nume_soli").jqxInput({
            height: 20,
            width: 180,
            theme: tema
        });
        jQuery("#proc_come_orde_txt_nume_rucc").jqxInput({
            height: 20,
            width: 190,
            theme: tema
        });
        jQuery("#proc_come_orde_txt_nomb_prov").jqxInput({
            height: 20,
            width: 180,
            theme: tema
        });
        jQuery("#proc_come_orde_txt_corr_prov").jqxInput({
            height: 20,
            width: 180,
            theme: tema
        });

        jQuery("#proc_come_orde_txt_cont_prov").jqxInput({
            height: 20,
            width: 190,
            theme: tema
        });
        jQuery("#proc_come_orde_txt_telf_prov").jqxInput({
            height: 20,
            width: 180,
            theme: tema
        });
        jQuery("#proc_come_orde_txt_dire_prov").jqxInput({
            height: 20,
            width: 180,
            theme: tema
        });

        jQuery("#proc_come_orde_txt_ciud_prov").jqxInput({
            height: 20,
            width: 180,
            theme: tema
        });

        jQuery("#proc_come_orde_txt_luga_entr").jqxInput({
            height: 20,
            width: 180,
            theme: tema
        });
        jQuery("#proc_come_orde_txt_cond_pago").jqxInput({
            height: 20,
            width: 180,
            theme: tema
        });
        var proc_orde_serv_tipo_mone = new Array({'codi_mone': 'SOL', 'desc_mone': 'SOLES'}, {'codi_mone': 'DOL', 'desc_mone': 'DOLARES'});
        jQuery("#proc_come_orde_txt_tipo_mone").jqxDropDownList({
            displayMember: "desc_mone",
            valueMember: "codi_mone",
            dropDownHeight: 70,
            source: proc_orde_serv_tipo_mone,
            theme: tema,
            disabled: false,
            width: 100,
            height: 18,
            selectedIndex: -1,
            placeHolder: "MONEDA",
        });

        jQuery("#proc_come_orde_txt_cent_cost").jqxDropDownList({
            theme: tema,
            width: 240,
            height: 24,
            placeHolder: "CENTRO DE COSTOS",
            selectedIndex: -1,
            valueMember: "codi_cent",
            displayMember: 'nomb_cent',
            dropDownHeight: 85
        });
        proc_come_orde_cent_cost_gene();

        var proc_orde_serv_apro_orde = new Array({'codi_empr_usua': 'antony_rodriguez', 'desc_usua': 'ANTONY RODRIGUEZ TORAL'}, {'codi_empr_usua': 'luvia_hasani', 'desc_usua': 'LUVIA HASANI PADILLA'});
        jQuery("#proc_come_orde_txt_usua_apro").jqxDropDownList({
            displayMember: "desc_usua",
            valueMember: "codi_empr_usua",
            source: proc_orde_serv_apro_orde,
            dropDownHeight: 70,
            theme: tema,
            disabled: false,
            width: 180,
            height: 18,
            selectedIndex: -1,
            placeHolder: "USUARIO APROBADOR"
        });

        jQuery("#proc_orde_serv_txt_codi_prod").jqxInput({
            height: 20,
            width: 190,
            theme: tema
        });

        jQuery("#proc_orde_serv_txt_nomb_prod").jqxInput({
            height: 20,
            width: 280,
            theme: tema
        });
        jQuery("#proc_orde_serv_txt_unid_medi").jqxInput({
            height: 20,
            width: 190,
            theme: tema
        });
        jQuery("#proc_orde_serv_txt_cant_prod").jqxInput({
            height: 20,
            width: 80,
            theme: tema
        });

        jQuery("#proc_orde_serv_txt_prec_neto").jqxInput({
            height: 20,
            width: 80,
            theme: tema
        });
        jQuery("#proc_orde_serv_txt_tota_neto").jqxInput({
            height: 20,
            width: 80,
            theme: tema,
            disabled: true
        });
        jQuery("#proc_orde_serv_txt_tota_ivaa").jqxInput({
            height: 20,
            width: 80,
            theme: tema,
            disabled: true
        });
        jQuery("#proc_orde_serv_txt_tota_orde").jqxInput({
            height: 20,
            width: 80,
            theme: tema,
            disabled: true
        });
        jQuery("#proc_orde_serv_txt_tota_neto").val('0.00');
        jQuery("#proc_orde_serv_txt_tota_ivaa").val('0.00');
        jQuery("#proc_orde_serv_txt_tota_orde").val('0.00');
        var dato_vent_gene_orde_comp = new Array();
        var sour_vent_gene_orde_comp =
                {
                    localdata: dato_vent_gene_orde_comp,
                    datatype: "array",
                    datafields:
                            [
                                {name: 'codi_prod', type: 'string'},
                                {name: 'nomb_prod', type: 'string'},
                                {name: 'cant_prod', type: 'string'},
                                {name: 'prec_neto', type: 'number'},
                                {name: 'tota_neto', type: 'number'},
                                {name: 'tota_ivaa', type: 'number'},
                                {name: 'tota_prod', type: 'number'},
                            ]
                };
        var data_vent_gene_orde_comp = new jQuery.jqx.dataAdapter(sour_vent_gene_orde_comp);

        jQuery("#proc_orde_serv_prod_gril").jqxGrid(
                {
                    width: jQuery("#proc_orde_serv_tabl").width() - 10,
                    height: jQuery("#proc_orde_serv_tabl").height() - 350,
                    theme: tema,
                    source: data_vent_gene_orde_comp,
                    columnsresize: true,
                    sortable: true,
                    filterable: true,
                    altrows: true,
                    selectionmode: 'none',
                    showemptyrow: false,
                    columnsreorder: true,
                    columns: [
                        {text: 'CODIGO', dataField: 'codi_prod', width: 100},
                        {text: 'PRODUCTO', dataField: 'nomb_prod'},
                        {text: 'U. MEDIDA', dataField: 'unid_medi'},
                        {text: 'CANTIDAD', dataField: 'cant_prod', cellsalign: 'right', width: 100},
                        {text: 'PRECIO NETO', dataField: 'prec_neto', cellsformat: 'D4', cellsalign: 'right', width: 100},
                        {text: 'TOTAL NETO', dataField: 'tota_neto', cellsformat: 'D4', cellsalign: 'right', width: 100},
                        {text: 'TOTAL IVAA', dataField: 'tota_ivaa', cellsformat: 'D4', cellsalign: 'right', width: 100},
                        {text: 'TOTAL', dataField: 'tota_prod', cellsformat: 'D4', cellsalign: 'right', width: 100}
                    ]
                });
        jQuery("#proc_orde_serv_prod_gril").jqxGrid('localizestrings', localizationobj);
        //Soluciona bug

        jQuery("#proc_orde_serv_txt_prec_neto").unbind('change');
        jQuery("#proc_orde_serv_txt_prec_neto").change(function () {

            jQuery("#proc_orde_serv_lbl_mens").html("");
            if (jQuery.trim(jQuery("#proc_orde_serv_txt_prec_neto").val()) != '') {
                if (jQuery.trim(jQuery("#proc_orde_serv_txt_cant_prod").val()) != '') {
                    if (parseFloat(jQuery.trim(jQuery("#proc_orde_serv_txt_prec_neto").val())) > 0) {

                        var proc_orde_serv_comp_esta = 0;
                        if (jQuery('#proc_orde_serv_prod_gril').jqxGrid('getrows').length > 0) {
                            deta_json = jQuery("#proc_orde_serv_prod_gril").jqxGrid('exportdata', 'json');
                            jQuery.each(jQuery.parseJSON(deta_json), function (idx, obj) {
                                if (obj.CODIGO === jQuery.trim(jQuery("#proc_orde_serv_txt_codi_prod").val())) {
                                    proc_orde_serv_comp_esta = 1
                                }
                            });
                        }
                        if (proc_orde_serv_comp_esta == 1) {
                            jQuery("#proc_orde_serv_txt_codi_prod").val('');
                            jQuery("#proc_orde_serv_txt_codi_prod").focus();
                            jQuery("#proc_orde_serv_lbl_mens").html('* ERROR CODIGO PRODUCTO ' + jQuery("#proc_orde_serv_txt_codi_prod").val() + ' YA SE ENCUENTRA INGRESADO.');

                        }
                        if (proc_orde_serv_comp_esta == 0) {
                            var proc_orde_serv_comp_deta_prod = {};
                            var prec_neto = parseFloat(jQuery.trim(jQuery("#proc_orde_serv_txt_prec_neto").val())).toFixed(2);
                            var cant_prod = parseFloat(jQuery.trim(jQuery("#proc_orde_serv_txt_cant_prod").val())).toFixed(2);
                            var prec_tota = parseFloat(cant_prod * prec_neto).toFixed(2);
                            var tota_prod = parseFloat(prec_tota * 1.18).toFixed(2);
                            var tota_igvv = parseFloat(tota_prod - prec_tota).toFixed(2);
                            // var tota_prod_ivaa = parseFloat(tota_igvv + prec_tota).toFixed(4);

                            proc_orde_serv_comp_deta_prod["codi_prod"] = jQuery.trim(jQuery("#proc_orde_serv_txt_codi_prod").val());
                            proc_orde_serv_comp_deta_prod["nomb_prod"] = jQuery.trim(jQuery("#proc_orde_serv_txt_nomb_prod").val());
                            proc_orde_serv_comp_deta_prod["unid_medi"] = jQuery.trim(jQuery("#proc_orde_serv_txt_unid_medi").val());
                            proc_orde_serv_comp_deta_prod["tota_ivaa"] = tota_igvv;
                            proc_orde_serv_comp_deta_prod["tota_prod"] = tota_prod;
                            proc_orde_serv_comp_deta_prod["cant_prod"] = cant_prod;
                            proc_orde_serv_comp_deta_prod["prec_neto"] = prec_neto;
                            proc_orde_serv_comp_deta_prod["tota_neto"] = prec_tota;

                            var tota_neto = parseFloat(jQuery("#proc_orde_serv_txt_tota_neto").val()).toFixed(2);
                            var tota_ivaa = parseFloat(jQuery("#proc_orde_serv_txt_tota_ivaa").val()).toFixed(2);
                            var tota_orde = parseFloat(jQuery("#proc_orde_serv_txt_tota_orde").val()).toFixed(2);
                            tota_neto = parseFloat(tota_neto) + parseFloat(prec_tota);
                            tota_neto = parseFloat(tota_neto).toFixed(2);

                            tota_orde = parseFloat(tota_neto * 1.18).toFixed(2);

                            tota_ivaa = parseFloat(tota_orde - tota_neto).toFixed(2);




                            jQuery("#proc_orde_serv_txt_tota_neto").val(tota_neto);
                            jQuery("#proc_orde_serv_txt_tota_ivaa").val(tota_ivaa);
                            jQuery("#proc_orde_serv_txt_tota_orde").val(tota_orde);

                            jQuery("#proc_orde_serv_prod_gril").jqxGrid('addrow', null, proc_orde_serv_comp_deta_prod);
                            jQuery("#proc_orde_serv_txt_codi_prod").val('');
                            jQuery("#proc_orde_serv_txt_nomb_prod").val('');
                            jQuery("#proc_orde_serv_txt_unid_medi").val('');
                            jQuery("#proc_orde_serv_txt_cant_prod").val('');
                            jQuery("#proc_orde_serv_txt_prec_neto").val('');
                            jQuery("#proc_orde_serv_txt_codi_prod").focus();
                        }

                    } else {
                        jQuery("#proc_orde_serv_txt_prec_neto").focus();
                        jQuery("#proc_orde_serv_lbl_mens").html("* ERROR PRECIO NETO DEBE DE SER MAYOR IGUAL A 1");
                    }
                } else {
                    jQuery("#proc_orde_serv_txt_cant_prod").focus();
                    jQuery("#proc_orde_serv_txt_prec_neto").val('');
                    jQuery("#proc_orde_serv_lbl_mens").html("* ERROR CANTIDAD DEBE DE SER MAYOR IGUAL A 1");
                }
            } else {
                jQuery("#proc_orde_serv_txt_prec_neto").focus();
            }

        });

        jQuery('#proc_orde_serv_prod_gril').on('rowdoubleclick', function (event)
        {


            var args = event.args;
            var row = args.rowindex;
            var dataRecord = jQuery("#proc_orde_serv_prod_gril").jqxGrid('getrowdata', row);
            var indexRecord = jQuery("#proc_orde_serv_prod_gril").jqxGrid('getrowid', row);


            jQuery("#proc_orde_serv_txt_codi_prod").val(dataRecord.codi_prod);
            jQuery("#proc_orde_serv_txt_nomb_prod").val(dataRecord.nomb_prod);
            jQuery("#proc_orde_serv_txt_unid_medi").val(dataRecord.unid_medi);
            jQuery("#proc_orde_serv_txt_cant_prod").val(dataRecord.cant_prod);

            jQuery("#proc_orde_serv_txt_prec_neto").val('');
            jQuery("#proc_orde_serv_txt_prec_neto").focus();

            var tota_neto = parseFloat(jQuery("#proc_orde_serv_txt_tota_neto").val());
            var tota_ivaa = parseFloat(jQuery("#proc_orde_serv_txt_tota_ivaa").val());
            var tota_orde = parseFloat(jQuery("#proc_orde_serv_txt_tota_orde").val());



            tota_neto = parseFloat(tota_neto - parseFloat(jQuery.trim(dataRecord.tota_neto)));

            tota_neto = parseFloat(tota_neto).toFixed(2)


            tota_orde = parseFloat(tota_neto * 1.18).toFixed(2);
            tota_ivaa = parseFloat(tota_orde - tota_neto).toFixed(2);



            jQuery("#proc_orde_serv_txt_tota_neto").val(tota_neto);
            jQuery("#proc_orde_serv_txt_tota_ivaa").val(tota_ivaa);
            jQuery("#proc_orde_serv_txt_tota_orde").val(tota_orde);

            if (jQuery('#proc_orde_serv_prod_gril').jqxGrid('getrows').length > 0) {
                jQuery("#proc_orde_serv_prod_gril").jqxGrid('deleterow', indexRecord);
            }
        });

        jQuery("#proc_orde_serv_btn_cerr").click(function () {
            jQuery('#proc_orde_serv_tabl').jqxWindow('close');
        });
        jQuery("#proc_orde_serv_btn_gene").click(function () {
            proc_come_orde_regi();
        });
        /*
         jQuery("#vent_gene_orde_comp_btn_impr").click(function(){
         vent_gene_orde_comp_impr();
         });
         */
        jQuery("#proc_orde_serv_btn_limp").click(function () {
            jQuery("#proc_come_orde_txt_nomb_soli").val('');
            jQuery("#proc_come_orde_txt_corr_soli").val('');
            jQuery("#proc_come_orde_txt_nume_soli").val('');

            jQuery("#proc_come_orde_txt_nume_rucc").val('');
            jQuery("#proc_come_orde_txt_nomb_prov").val('');
            jQuery("#proc_come_orde_txt_corr_prov").val('');
            jQuery("#proc_come_orde_txt_cont_prov").val('');
            jQuery("#proc_come_orde_txt_telf_prov").val('');
            jQuery("#proc_come_orde_txt_dire_prov").val('');
            jQuery("#proc_come_orde_txt_ciud_prov").val('');
            jQuery("#proc_come_orde_txt_luga_entr").val('');
            jQuery("#proc_come_orde_txt_cond_pago").val('');
            jQuery("#proc_come_orde_txt_tipo_mone").jqxDropDownList({selectedIndex: -1});
            jQuery("#proc_come_orde_txt_cent_cost").jqxDropDownList({selectedIndex: -1});
            jQuery("#proc_come_orde_txt_usua_apro").jqxDropDownList({selectedIndex: -1});
            jQuery("#proc_orde_serv_txt_tota_neto").val('');
            jQuery("#proc_orde_serv_txt_tota_ivaa").val('');
            jQuery("#proc_orde_serv_txt_tota_orde").val('');
        });

    });
}

function proc_come_orde_cent_cost_gene() {
    jQuery("#proc_orde_serv_lbl_mens").html("");
    jQuery.ajaxSetup({async: true});
    jQuery.post(
            proc_orde_serv_nomb_cont + "orde_serv_cent_cost_gene", {
                cache: Math.random()
            }, function (html) {
        if (html.mensaje == "") {

            var sour_codi_cent = {
                datatype: "json",
                datafields: [
                    {name: 'codi_cent', type: 'string'},
                    {name: 'nomb_cent', type: 'string'}
                ],
                localdata: html.data
            };
            var data_cent = new jQuery.jqx.dataAdapter(sour_codi_cent);

            jQuery("#proc_come_orde_txt_cent_cost").jqxDropDownList({
                selectedIndex: -1,
                source: data_cent,
                displayMember: "nomb_cent",
                valueMember: "codi_cent"
            });
        } else {
            jQuery("#proc_orde_serv_lbl_mens").html(html.mensaje);
        }
    }, "json");

}


function proc_come_orde_regi() {
    jQuery("#proc_orde_serv_lbl_mens").html("* REGISTRANDO ESPERE POR FAVOR");
    data_info = jQuery('#proc_orde_serv_prod_gril').jqxGrid('getdatainformation');
    data_rows = data_info.rowscount;
    if (data_rows == 0) {
        jQuery("#proc_orde_serv_lbl_mens").html("* ERROR DETALLE PRODUCTOS VACIA.");
    } else {

        jQuery.ajaxSetup({async: false});
        jQuery.post(
                proc_orde_serv_nomb_cont + "orde_serv_regi", {
                    cache: Math.random(),
                    soli_orde: jQuery.trim(jQuery("#proc_come_orde_txt_nomb_soli").val()),
                    corr_soli: jQuery.trim(jQuery("#proc_come_orde_txt_corr_soli").val()),
                    telf_soli: jQuery.trim(jQuery("#proc_come_orde_txt_nume_soli").val()),
                    prov_orde: jQuery.trim(jQuery("#proc_come_orde_txt_nomb_prov").val()),
                    cont_prov: jQuery.trim(jQuery("#proc_come_orde_txt_cont_prov").val()),
                    telf_prov: jQuery.trim(jQuery("#proc_come_orde_txt_telf_prov").val()),
                    rucc_prov: jQuery.trim(jQuery("#proc_come_orde_txt_nume_rucc").val()),
                    ciud_prov: jQuery.trim(jQuery("#proc_come_orde_txt_ciud_prov").val()),
                    dire_prov: jQuery.trim(jQuery("#proc_come_orde_txt_dire_prov").val()),
                    corr_prov: jQuery.trim(jQuery("#proc_come_orde_txt_corr_prov").val()),
                    luga_entr: jQuery.trim(jQuery("#proc_come_orde_txt_luga_entr").val()),
                    cond_pago: jQuery.trim(jQuery("#proc_come_orde_txt_cond_pago").val()),
                    tipo_mone: jQuery.trim(jQuery("#proc_come_orde_txt_tipo_mone").val()),
                    cent_cost: jQuery.trim(jQuery("#proc_come_orde_txt_cent_cost").val()),
                    apro_orde: jQuery.trim(jQuery("#proc_come_orde_txt_usua_apro").val()),
                    tota_neto: jQuery.trim(jQuery("#proc_orde_serv_txt_tota_neto").val()),
                    tota_ivaa: jQuery.trim(jQuery("#proc_orde_serv_txt_tota_ivaa").val()),
                    tota_orde: jQuery.trim(jQuery("#proc_orde_serv_txt_tota_orde").val()),
                    deta_prod: jQuery("#proc_orde_serv_prod_gril").jqxGrid('exportdata', 'json')
                }, function (html) {
            if (html.mensaje != "") {
                jQuery("#proc_orde_serv_lbl_mens").html(html.mensaje);
            } else {
                // jQuery("#proc_come_orde_serv_btn_limp").trigger("click");
                //  proc_come_orde_serv_esta = 1;
                //    var nomb_arch_pdff = html.html
                //enviar html.html
                //   proc_come_orde_serv_visu_pdf(nomb_arch_pdff);
                //LIMPIAR LOS DATOS
                jQuery("#proc_orde_serv_lbl_mens").html("* REGISTRO SATISFACTORIO");
            }
        }, "json").fail(function (xhr, textStatus, errorThrown) {
            main_erro("proc_come_orde_regi()", proc_orde_serv_nomb_cont + "orde_serv_regi", xhr.responseText, jQuery("#codi_usua").html())
            jQuery("#proc_orde_serv_lbl_mens").html('* SU MENSAJE DE ERROR A SIDO ENVIADO A SISTEMAS.');
        });

    }

}
