<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');
ini_set('memory_limit', '-1');
set_time_limit(0);

class Main extends MX_Controller {

    private $codi_usua;
    private $nomb_usua;
    private $nomb_empr;

    public function __construct() {
        parent::__construct();
        $this->nomb_usua = $this->session->userdata('nomb_usua');
        $this->nomb_empr = $this->session->userdata('nomb_empr');
        $this->codi_usua = $this->session->userdata('codi_usua');
        $this->load->library('Myphp');
        if ($this->codi_usua == "") {
            redirect('/', 'refresh');
        }
    }

    public function apro_orde() {

        $this->load->view('apro_orde.php');
    }

    public function apro_orde_form() {

        $this->load->view('apro_orde_form.php');
    }
 /**Busca las ordenes por aprobar de acuerdo al usuario*/
    public function apro_orde_gene() {
        $validar = array('mensaje' => '', 'data' => array());
        $this->load->model('orde');
        $acti_usua = $this->codi_usua;
        $data = $this->orde->orde_sele($acti_usua);
        if (count($data) == 0) {
            $validar['mensaje'] = "* LA LISTA VACIA.";
        } else {
            for ($i = 0; $i < count($data); $i++) {

                if ($data[$i]->tipo_mone == "SOL") {
                    $tipo_mone = "SOLES";
                } else {
                    $tipo_mone = "DOLARES";
                }
                $nomb_arch = "OCM-" . $data[$i]->codi_cent . "-" . $data[$i]->nume_orde;


                $validar['data'][] = array(
                    'cons_fila' => $i + 1,
                    'cons_orde' => mb_strtoupper(trim($data[$i]->cons_orde), 'UTF-8'),
                    'soli_orde' => mb_strtoupper(trim($data[$i]->soli_orde), 'UTF-8'),
                    'prov_orde' => mb_strtoupper(trim($data[$i]->prov_orde), 'UTF-8'),
                    'nomb_cent' => mb_strtoupper(trim($data[$i]->nomb_cent), 'UTF-8'),
                    'cond_pago' => mb_strtoupper(trim($data[$i]->cond_pago), 'UTF-8'),
                    'tota_orde' => mb_strtoupper(trim($data[$i]->tota_orde), 'UTF-8'),
                    'nomb_arch' => mb_strtoupper(trim($nomb_arch), 'UTF-8'),
                    'tipo_mone' => mb_strtoupper(trim($tipo_mone), 'UTF-8')
                );
            }
        }
        echo json_encode($validar);
    }
/**Permite aprobar ordenes de compra y envia un correo al proveedor*/
    public function apro_orde_apro() {
        $validar = array('mensaje' => '', 'data' => array());
        $cons_orde = trim(strtolower($_REQUEST['cons_orde']));
        $acti_usua = $this->codi_usua;
        $esta_apro = 'APR';
        $this->load->model('orde');
        $this->orde->orde_regi($cons_orde, $acti_usua, $esta_apro);
        $data = $this->orde->orde_envi($cons_orde);

        $nomb_arch = "OCM-" . $data[0]->codi_cent . "-" . $data[0]->nume_orde . ".pdf";
        $nomb_prov = $data[0]->cont_prov;
        $corr_prov = $data[0]->corr_prov;
        $dato = $this->orde_impr($cons_orde);

        $asun_mens = "ORDEN DE COMPRA APROBADA";
        $text_mens = "Buen Dia Sr(a).$nomb_prov.<br>";
        $text_mens .= "Se adjunta orden de compras , por favor de traer la orden de compra para la recepcion de los productos.<br>";
        $text_mens .= "Gracias.<br>";
        $file_name_area = FILE_PATH . "/ordenes/" . $nomb_arch;
        //CODIGO PARA ENVIAR MENSAJES CON DOCUMENTOS DESDE MI LOCALHOST NUNCA ELIMINAR
        $mail = new PHPMailer();
        $mail->SMTPAuth = true; // habilitamos la autenticación SMTP
        $mail->From = 'noresponder@bluecorp.com';
        $mail->FromName = 'NO RESPONDER';
        $mail->IsHTML(true);
        $mail->Subject = $asun_mens;
        $mail->Body = $text_mens;
        $mail->addAttachment($file_name_area);
        $mail->AddAddress($corr_prov);
        if (!$mail->Send()) {

            die($mail->ErrorInfo);
        } else {
            log_message('info', "enviado correctamente");
        }

        echo json_encode($validar);
    }
/**Permite desaprobar una orden de compra y envia un mensaje de alerta al usuario quien realizo la compra.*/
    public function apro_orde_desa() {
        $validar = array('mensaje' => '', 'data' => array());
        $cons_orde = trim(strtolower($_REQUEST['cons_orde']));
        $acti_usua = $this->codi_usua;
        $esta_apro = 'DES';
        $this->load->model('orde');
        $this->orde->orde_regi($cons_orde, $acti_usua, $esta_apro);
        $data = $this->orde->orde_envi($cons_orde);
        $nomb_arch = "OCM-" . $data[0]->codi_cent . "-" . $data[0]->nume_orde . ".pdf";
        $nomb_soli = $data[0]->soli_orde;
        $corr_soli = $data[0]->corr_soli;

        $asun_mens = "ORDEN DE COMPRA DESAPROBADA";
        $text_mens = "Buen Dia Sr(a).$nomb_soli.<br>";
        $text_mens .= "La orden de compra  fue desaprobada.<br>";
        $text_mens .= "Gracias.<br>";
        $file_name_area = FILE_PATH . "/ordenes/" . $nomb_arch;
        //CODIGO PARA ENVIAR MENSAJES CON DOCUMENTOS DESDE MI LOCALHOST NUNCA ELIMINAR
        $mail = new PHPMailer();
        $mail->SMTPAuth = true; // habilitamos la autenticación SMTP
        $mail->From = 'noresponder@bluecorp.com';
        $mail->FromName = 'NO RESPONDER';
        $mail->IsHTML(true);
        $mail->Subject = $asun_mens;
        $mail->Body = $text_mens;
        $mail->addAttachment($file_name_area);
        $mail->AddAddress($corr_soli);
        if (!$mail->Send()) {

            die($mail->ErrorInfo);
        } else {
            log_message('info', "enviado correctamente");
        }

        echo json_encode($validar);
    }

    public function orde_impr($cons_orde_serv_data) {
        $validar = array('mensaje' => '', 'html' => '');
        $this->load->model('orde');

        $this->load->model('cent');
        $this->load->model('usua');
        $data = $this->orde->orde_list($cons_orde_serv_data);
        if (count($data) == 0) {
            $validar['mensaje'] = "* ERROR NO SE PUEDE IMPRIMIR";
        } else {
            $cons_orde_serv = $data[0]->cons_orde;
            $cent_cost = trim($data[0]->cent_cost);
            $data_cent = $this->cent->cent_list($cent_cost);
            $codi_cent = $data_cent[0]->codi_cent;
            $nume_orde = $data[0]->nume_orde;

            $nomb_arch = 'OCM-' . $codi_cent . '-' . $nume_orde . '.pdf';
            $dire_arch = FILE_PATH . 'ordenes/' . $nomb_arch;

            if (file_exists($dire_arch)) {
                unlink($dire_arch);
            }

            $this->load->library("tcpdf_lib");
            $tipo_mone_desc = "";

            $soli_orde = $data[0]->soli_orde;

            $corr_soli = $data[0]->corr_soli;
            $telf_soli = $data[0]->telf_soli;
            $prov_orde = $data[0]->prov_orde;
            $telf_prov = $data[0]->telf_prov;
            $rucc_prov = $data[0]->rucc_prov;
            $cont_prov = $data[0]->cont_prov;
            $fech_orde = $data[0]->fech_orde;

            $ciud_prov = $data[0]->ciud_prov;
            $cond_pago = $data[0]->cond_pago;
            $dire_prov = $data[0]->dire_prov;
            $tota_neto = $data[0]->tota_neto;
            $tota_ivaa = $data[0]->tota_ivaa;
            $tota_orde = $data[0]->tota_orde;
            $tipo_mone = $data[0]->tipo_mone;

            //  $dire_prov = "AV LA MAR 240 SANTA ANITA - LIMA ALTURA DE PLAZA VEA";
            // $corr_prov = "ANTONY_RODRIGUEZ@DUPREE.COM.PE,GISSELA_SALINAS@DUPREE.COM.PE";
            $corr_prov = $data[0]->corr_prov;
            $apro_orde = $data[0]->apro_orde;
            $acti_usua = $data[0]->acti_usua;
            $acti_hora = $data[0]->acti_hora;
            //se obtiene el nombre del centro que asumira los costos
            $codi_nume_orde = 'OCM' . '-' . $codi_cent . '-' . $nume_orde;


            $nomb_area = $data_cent[0]->nomb_cent;
            // Se obtiene el correo del usuario
            $data_usua = $this->usua->usua_corr($apro_orde);
            $corr_apro = $data_usua[0]->corr_usua;
            $nomb_empl = $data_usua[0]->nomb_usua;

            if ($tipo_mone == 'SOL') {
                $tipo_mone_desc = "SOLES";
            } else {
                $tipo_mone_desc = "DOLARES";
            }
            $data_deta = $this->orde->orde_deta($cons_orde_serv);
            $tota_deta = count($data_deta);
            if ($tota_deta > 0 && $tota_deta <= 27) {

                $esta_pagi = 1;
            } elseif ($tota_deta > 27 && $tota_deta <= 54) {
                $esta_pagi = 2;
            } elseif ($tota_deta > 54 && $tota_deta <= 82) {
                $esta_pagi = 3;
            } elseif ($tota_deta > 82 && $tota_deta <= 110) {
                $esta_pagi = 4;
            } else {
                $esta_pagi = 5;
            }
            $luga_entr = $data[0]->luga_entr;
         
            $info_orde = "Ingresar informacion adicional";
            $prot_orde = "Por favor de entregar los documento dentro del horario de oficina 8:00 am a 5:30 pm";



            $this->pdf = new TCPDF();
            $this->pdf->setPrintHeader(false);
            $this->pdf->setPrintFooter(false);
            $this->pdf->SetMargins(2, 0, 2);

            for ($o = 1; $o <= $esta_pagi; $o++) {


                $this->pdf->AddPage("P", "A4");
                $this->pdf->SetFont('helvetica', 'B', 10);
                /* CUADRADO DE LA IMAGEN */
                $this->pdf->SetXY(140, 1);
                $this->pdf->Cell(0, 25, ' ', 1, 0);

                //$docu_root = $_SERVER['DOCUMENT_ROOT'];
                $this->pdf->image(IMAGENES . "img/blue.png", 150, 2, 45, 20);
                /* CUADRADO DEL TITULO */
                $this->pdf->SetXY(2, 1);
                $this->pdf->Cell(0, 25, ' ', 1, 0);

                $this->pdf->SetFont('helvetica', 'B', 12);
                $this->pdf->SetXY(2, 5);
                $this->pdf->Cell(0, 5, 'PRUEBA S.R.L.', 0, 0, "L");

                $this->pdf->SetFont('helvetica', '', 8);
                $this->pdf->SetXY(2, 10.5);
                $this->pdf->Cell(0, 5, 'R.U.C. 2152218023', 0, 0, "L");

                $this->pdf->SetFont('helvetica', '', 8);
                $this->pdf->SetXY(2, 15);
                $this->pdf->Cell(0, 5, 'AV LOS MIRLOS 240 URB VIRIA - SANTA ANITA -LIMA TELF 391-2500 ', 0, 0, "L");
                //ESPACIO
                $this->pdf->SetXY(2, 26.1);
                $this->pdf->Cell(0, 4, ' ', 1, 0);
                //SOLICITANTE
                $this->pdf->SetFont('helvetica', 'B', 7);
                $this->pdf->SetXY(2, 30);
                $this->pdf->Cell(138, 5, "SOLICITANTE: ", 1, 0, "L");

                $this->pdf->SetFont('helvetica', '', 7);
                $this->pdf->SetXY(20, 30);
                $this->pdf->Cell(0, 5, $soli_orde, 0, 0, "L");

                $this->pdf->SetFont('helvetica', 'B', 7);
                $this->pdf->SetXY(2, 35);
                $this->pdf->Cell(138, 5, "E-MAIL: ", 1, 0, "L");

                $this->pdf->SetFont('helvetica', '', 7);
                $this->pdf->SetXY(12, 35);
                $this->pdf->Cell(0, 5, $corr_soli, 0, 0, "L");

                $this->pdf->SetFont('helvetica', 'B', 7);
                $this->pdf->SetXY(2, 40);
                $this->pdf->Cell(138, 5, "TELEFONO: ", 1, 0, "L");

                $this->pdf->SetFont('helvetica', '', 7);
                $this->pdf->SetXY(17, 40);
                $this->pdf->Cell(0, 5, $telf_soli, 0, 0, "L");
                //ORDEN DE COMPRA
                $this->pdf->SetXY(140, 30);
                $this->pdf->Cell(0, 15, '', 1, 0);

                $this->pdf->SetXY(140, 31);
                $this->pdf->SetFont('helvetica', 'B', 11);
                $this->pdf->Cell(0, 5, 'ORDEN DE COMPRA', 0, 0, "C");

                $this->pdf->SetXY(140, 39);
                $this->pdf->SetFont('helvetica', 'B', 8);
                $this->pdf->Cell(0, 5, "Nro  $codi_nume_orde ", 0, 0, "C");
                $this->pdf->SetXY(200, 39);
                $this->pdf->SetFont('helvetica', 'B', 8);
                $this->pdf->Cell(0, 5, "OC ", 0, 0, "C");
                //ESPACIO
                $this->pdf->SetXY(2, 45.1);
                $this->pdf->Cell(0, 4, ' ', 1, 0);
                //DATOS PROVEEDOR
                $this->pdf->SetFont('helvetica', 'B', 7);
                $this->pdf->SetXY(2, 49);
                $this->pdf->Cell(138, 5, "PROVEEDOR : ", 1, 0, "L");

                $this->pdf->SetFont('helvetica', '', 7);
                $this->pdf->SetXY(20, 49);
                $this->pdf->Cell(0, 5, $prov_orde, 0, 0, "L");


                $this->pdf->SetXY(140, 49);
                $this->pdf->SetFont('helvetica', 'B', 7);
                $this->pdf->Cell(0, 5, "RUC : ", 1, 0, "L");

                $this->pdf->SetFont('helvetica', '', 7);
                $this->pdf->SetXY(148, 49);
                $this->pdf->Cell(0, 5, $rucc_prov, 0, 0, "L");


                $this->pdf->SetXY(140, 54);
                $this->pdf->SetFont('helvetica', 'B', 7);
                $this->pdf->Cell(0, 5, "FECHA : ", 1, 0, "L");

                $this->pdf->SetFont('helvetica', '', 7);
                $this->pdf->SetXY(151, 54);
                $this->pdf->Cell(0, 5, $fech_orde, 0, 0, "L");

                $this->pdf->SetXY(140, 59);
                $this->pdf->SetFont('helvetica', 'B', 7);
                $this->pdf->Cell(0, 5, "TELEFONO : ", 1, 0, "L");

                $this->pdf->SetFont('helvetica', '', 7);
                $this->pdf->SetXY(156, 59);
                $this->pdf->Cell(0, 5, $telf_prov, 0, 0, "L");



                $this->pdf->SetXY(122, 69);
                $this->pdf->SetFont('helvetica', 'B', 7);
                $this->pdf->Cell(0, 14, "LUGAR ", "LBR", 0, 'L');

                $this->pdf->SetXY(122, 72);
                $this->pdf->SetFont('helvetica', 'B', 7);
                $this->pdf->Cell(0, 14, "DE ENTREGA : ", "", 0, '');

                $this->pdf->SetXY(144, 75);
                $this->pdf->SetFont('helvetica', '', 7);
                $this->pdf->MultiCell(65, 14, $luga_entr, 0, '', 0, "L");


                $this->pdf->SetFont('helvetica', 'B', 7);
                $this->pdf->SetXY(2, 54);
                $this->pdf->Cell(138, 5, "CONTACTO : ", 1, 0, "L");

                $this->pdf->SetFont('helvetica', '', 7);
                $this->pdf->SetXY(18, 54);
                $this->pdf->Cell(0, 5, $cont_prov, 0, 0, "L");

                $this->pdf->SetXY(2, 59);
                $this->pdf->SetFont('helvetica', 'B', 7);
                $this->pdf->Cell(0, 5, "DIRECCION : ", 1, 0, "L");

                $this->pdf->SetFont('helvetica', '', 7);
                $this->pdf->SetXY(18, 59);
                $this->pdf->Cell(0, 5, $dire_prov, 0, 0, "L");

                $this->pdf->SetXY(140, 64);
                $this->pdf->SetFont('helvetica', 'B', 7);
                $this->pdf->Cell(0, 5, "CIUDAD : ", 1, 0, "L");

                $this->pdf->SetFont('helvetica', '', 7);
                $this->pdf->SetXY(152, 64);
                $this->pdf->Cell(0, 5, $ciud_prov, 0, 0, "L");

                $this->pdf->SetXY(2, 64);
                $this->pdf->SetFont('helvetica', 'B', 7);
                $this->pdf->Cell(0, 5, "E-MAIL(S) : ", 1, 0, "L");

                $this->pdf->SetFont('helvetica', '', 7);
                $this->pdf->SetXY(16, 64);
                $this->pdf->Cell(0, 5, $corr_prov, 0, 0, "L");
                /*
                  $this->pdf->SetXY(2, 64);
                  $this->pdf->SetFont('helvetica', 'B', 7);
                  $this->pdf->Cell(0, 5, "CIUDAD : ", 1, 0, "L");

                  $this->pdf->SetFont('helvetica', '', 7);
                  $this->pdf->SetXY(14, 64);
                  $this->pdf->Cell(0, 5, $ciud_prov, 0, 0, "L");

                 */
                //pagina    
                $this->pdf->SetFont('helvetica', 'B', 7);
                $this->pdf->SetXY(190, 265);
                $this->pdf->Cell(0, 5, "PAG :", 1, 0, "L");
                /*
                  if($tota_deta >= 7  && $tota_deta <= 27){
                  $esta_pagi_nume=2;
                  $this->pdf->SetXY(198, 265);
                  $this->pdf->SetFont('helvetica', '', 7);
                  $this->pdf->Cell(0, 5, "$o / $esta_pagi_nume", 0, 0, "L");
                  }else{
                  $this->pdf->SetXY(198, 265);
                  $this->pdf->SetFont('helvetica', '', 7);
                  $this->pdf->Cell(0, 5, "$o / $esta_pagi", 0, 0, "L");
                  }
                 */
                if ($tota_deta >= 7 && $tota_deta <= 27) {
                    $esta_pagi_nume = 2;
                    $this->pdf->SetXY(198, 265);
                    $this->pdf->SetFont('helvetica', '', 7);
                    $this->pdf->Cell(0, 5, "$o / $esta_pagi_nume", 0, 0, "L");
                } else {
                    if ($tota_deta > 27 && $tota_deta <= 32) {
                        $esta_pagi_nume = 2;
                        $this->pdf->SetXY(198, 265);
                        $this->pdf->SetFont('helvetica', '', 7);
                        $this->pdf->Cell(0, 5, "$o / $esta_pagi_nume", 0, 0, "L");
                    } else {

                        if ($tota_deta > 33 && $tota_deta <= 54) {
                            $esta_pagi_nume = 3;
                            $this->pdf->SetXY(198, 265);
                            $this->pdf->SetFont('helvetica', '', 7);
                            $this->pdf->Cell(0, 5, "$o / $esta_pagi_nume", 0, 0, "L");
                        } else {
                            $this->pdf->SetXY(198, 265);
                            $this->pdf->SetFont('helvetica', '', 7);
                            $this->pdf->Cell(0, 5, "$o / $esta_pagi", 0, 0, "L");
                        }
                    }
                }

                //usuario
                $this->pdf->SetFont('helvetica', 'B', 7);
                $this->pdf->SetXY(2, 265);
                $this->pdf->Cell(50, 5, "USUARIO :", 1, 0, "L");

                $this->pdf->SetXY(17, 265);
                $this->pdf->SetFont('helvetica', '', 7);
                $this->pdf->Cell(0, 5, "$acti_usua", 0, 0, "L");
                //fecha impresion
                $this->pdf->SetFont('helvetica', 'B', 7);
                $this->pdf->SetXY(52, 265);
                $this->pdf->Cell(138, 5, "FECHA DE IMPRESION :", 1, 0, "L");

                $this->pdf->SetXY(85, 265);
                $this->pdf->SetFont('helvetica', '', 7);
                $this->pdf->Cell(0, 5, "$acti_hora", 0, 0, "L");
                //acaba footer
                $this->pdf->SetXY(2, 69);
                $this->pdf->SetFont('helvetica', 'B', 7);
                $this->pdf->Cell(120, 14, "CONDICIONES ", "LBR", 0, '');
                $this->pdf->SetFont('helvetica', 'B', 7);
                $this->pdf->SetXY(2, 72);
                $this->pdf->Cell(120, 14, "DE PAGO : ", "", 0, '');


                $this->pdf->SetFont('helvetica', '', 7);
                $this->pdf->SetXY(22, 74);
                $this->pdf->MultiCell(98, 14, $cond_pago, 0, '', 0, "L");

                $this->pdf->SetFont('helvetica', 'B', 7);
                $this->pdf->SetXY(2, 83);

                $this->pdf->Cell(18, 5, "CODIGO", 1, 0, "C");
                $this->pdf->Cell(111, 5, "DESCRIPCION", 1, 0, "C");
                $this->pdf->Cell(14, 5, "U. MEDIDA", 1, 0, "C");
                $this->pdf->Cell(10, 5, "CANT.", 1, 0, "C");
                $this->pdf->Cell(8, 5, "IGV", 1, 0, "C");
                $this->pdf->Cell(16, 5, "F. ENTREGA", 1, 0, "C");
                $this->pdf->Cell(14, 5, "VR. UNID", 1, 0, "C");
                $this->pdf->Cell(0, 5, "VR. TOTA", 1, 0, "C");
            }
            $this->pdf->setPage(1);
            $nume_maxi_regi = 0;
            $inic_pagi = 1;
            $tota_unid = 0.00;
            $tota_prod_neto = 0.00;

            for ($i = 0; $i < count($data_deta); $i++) {
                $codi_prod = $data_deta[$i]->codi_prod;
                $nomb_prod = $data_deta[$i]->nomb_prod;
                $cant_prod = $data_deta[$i]->cant_prod;

                $prec_neto = $data_deta[$i]->prec_neto;
                $tota_prod = $data_deta[$i]->tota_prod;
                $unid_medi = $data_deta[$i]->unid_medi;
                $tota_unid = $tota_unid + $cant_prod;
                $tota_prod_neto = $prec_neto * $cant_prod;
                $nume_maxi_regi = $nume_maxi_regi + 1;
                if ($nume_maxi_regi == 1) {
                    $y = 88;
                    $borde = "L";
                    $borde_fina = "LR";
                }
                if ($nume_maxi_regi >= 2 && $nume_maxi_regi <= 26) {
                    $y = $y + 5;
                    $borde = "L";
                    $borde_fina = "LR";
                }
                if ($nume_maxi_regi == 27) {
                    $y = $y + 5;
                    $borde = "LB";
                    $borde_fina = "LRB";
                }
                if ((count($data_deta) - $i) == 1) {
                    $borde = "LB";
                    $borde_fina = "LRB";
                }
                $this->pdf->SetXY(2, $y);
                $this->pdf->SetFont('helvetica', '', 7);
                $this->pdf->Cell(18, 5, $codi_prod, $borde, 0, "C");
                $this->pdf->Cell(111, 5, $nomb_prod, $borde, 0, "L");
                $this->pdf->Cell(14, 5, $unid_medi, $borde, 0, "L");
                $this->pdf->Cell(10, 5, $cant_prod, $borde, 0, "L");
                $this->pdf->Cell(8, 5, "18%", $borde, 0, "L");
                $this->pdf->Cell(16, 5, '', $borde, 0, "L");
                $this->pdf->Cell(14, 5, number_format($prec_neto, 2, '.', ','), $borde, 0, "R");
                $this->pdf->Cell(0, 5, number_format($tota_prod_neto, 2, '.', ','), $borde_fina, 1, "R");
                if ($nume_maxi_regi == 27 && $esta_pagi != $inic_pagi) {
                    $nume_maxi_regi = 0;
                    $inic_pagi = $inic_pagi + 1;
                    $this->pdf->setPage($inic_pagi);
                }
            }
            $this->pdf->Ln(1);


            $this->pdf->SetFont('helvetica', 'B', 7);
            $this->pdf->Cell(40, 5, 'UNIDADES', 1, 0, "C");
            $this->pdf->Cell(40, 5, 'TOTAL NETO', 1, 0, "C");
            $this->pdf->Cell(30, 5, 'TOTAL IGV', 1, 0, "C");
            $this->pdf->Cell(40, 5, 'IMPORTE TOTAL', 1, 0, "C");
            $this->pdf->Cell(0, 5, 'MONEDA', 1, 1, "C");

            $this->pdf->SetFont('helvetica', '', 7);
            $this->pdf->Cell(40, 5, $tota_unid, 1, 0, "C");
            $this->pdf->Cell(40, 5, number_format($tota_neto, 2, '.', ','), 1, 0, "C");
            $this->pdf->Cell(30, 5, number_format($tota_ivaa, 2, '.', ','), 1, 0, "C");
            $this->pdf->Cell(40, 5, number_format($tota_orde, 2, '.', ','), 1, 0, "C");
            $this->pdf->Cell(0, 5, $tipo_mone_desc, 1, 1, "C");

            $this->pdf->Ln(1);
            $this->pdf->SetFont('helvetica', 'B', 7);
            $this->pdf->Cell(40, 6, "OBSERVACIONES :", "LBRT", 0, '');

            $this->pdf->SetFont('helvetica', '', 7);
            $this->pdf->MultiCell(0, 6, '', "LBRT", '', 0, "L");

            $this->pdf->Ln(7);
            $this->pdf->SetFont('helvetica', 'B', 7);
            $this->pdf->Cell(40, 4, "CENTRO DE COSTOS :", 1, 0, "L");
            $this->pdf->SetFont('helvetica', '', 7);
            $this->pdf->Cell(0, 4, $nomb_area, 1, 1, "L");
            $this->pdf->SetFont('helvetica', 'B', 7);
            $this->pdf->Cell(40, 4, "APROBADO POR :", 1, 0, "L");
            $this->pdf->SetFont('helvetica', '', 7);
            $this->pdf->Cell(0, 4, $apro_orde, 1, 1, "L");

            $this->pdf->Ln(1);
            $this->pdf->SetFont('helvetica', 'B', 6);
            $this->pdf->MultiCell(206, 5, $info_orde, 1, 'C', 0, "L");
            $this->pdf->Ln(9);
            $this->pdf->SetFont('helvetica', 'B', 6);
            $this->pdf->Cell(0, 2, " POR FAVOR LEER TERMINOS Y CONDICIONES AL FINAL DEL DOCUMENTO.", 1, 0, "L");
            /*
              $this->pdf->Ln(7);
              $this->pdf->SetFont('helvetica', 'B', 7);
              $this->pdf->MultiCell(200, 2, "TERMINOS Y CONDICIONES", 0, '', 0, "L");

              $this->pdf->Ln(3);
              $this->pdf->SetFont('helvetica', '', 6);
              $this->pdf->MultiCell(206, 0, $prot_orde, 1, 'J', 0, "L");


             */
            if ($tota_deta <= 6) {
                $this->pdf->Ln(4);
                $this->pdf->SetFont('helvetica', 'B', 7);
                $this->pdf->MultiCell(200, 2, "TERMINOS Y CONDICIONES", 0, '', 0, "L");

                $this->pdf->Ln(3);
                $this->pdf->SetFont('helvetica', '', 6);
                $this->pdf->MultiCell(206, 0, $prot_orde, 1, 'J', 0, "L");
            } else {

                if ($tota_deta == 28) {
                    $this->pdf->Ln(4);
                    $this->pdf->SetFont('helvetica', 'B', 7);
                    $this->pdf->MultiCell(200, 2, "TERMINOS Y CONDICIONES", 0, '', 0, "L");

                    $this->pdf->Ln(3);
                    $this->pdf->SetFont('helvetica', '', 6);
                    $this->pdf->MultiCell(206, 0, $prot_orde, 1, 'J', 0, "L");
                } else {
                    if ($tota_deta > 28 && $tota_deta <= 33) {

                        //$this->pdf->AddPage("P", "A4");
                        $this->pdf->Ln(4);
                        $this->pdf->SetFont('helvetica', 'B', 7);
                        $this->pdf->MultiCell(200, 2, "TERMINOS Y CONDICIONES", 0, '', 0, "L");

                        $this->pdf->Ln(3);
                        $this->pdf->SetFont('helvetica', '', 6);
                        $this->pdf->MultiCell(206, 0, $prot_orde, 1, 'J', 0, "L");
                        //pagina    
                        $this->pdf->SetFont('helvetica', 'B', 7);
                        $this->pdf->SetXY(190, 265);
                        $this->pdf->Cell(0, 5, "PAG :", 1, 0, "L");

                        $this->pdf->SetXY(198, 265);
                        $this->pdf->SetFont('helvetica', '', 7);
                        $this->pdf->Cell(0, 5, "2 / 2", 0, 0, "L");
                        //usuario
                        $this->pdf->SetFont('helvetica', 'B', 7);
                        $this->pdf->SetXY(2, 265);
                        $this->pdf->Cell(50, 5, "USUARIO :", 1, 0, "L");

                        $this->pdf->SetXY(17, 265);
                        $this->pdf->SetFont('helvetica', '', 7);
                        $this->pdf->Cell(0, 5, "$acti_usua", 0, 0, "L");
                        //fecha impresion
                        $this->pdf->SetFont('helvetica', 'B', 7);
                        $this->pdf->SetXY(52, 265);
                        $this->pdf->Cell(138, 5, "FECHA DE IMPRESION :", 1, 0, "L");

                        $this->pdf->SetXY(85, 265);
                        $this->pdf->SetFont('helvetica', '', 7);
                        $this->pdf->Cell(0, 5, "$acti_hora", 0, 0, "L");
                    } else {
                        if ($tota_deta > 33 && $tota_deta <= 54) {
                            $this->pdf->AddPage("P", "A4");
                            $this->pdf->Ln(4);
                            $this->pdf->SetFont('helvetica', 'B', 7);
                            $this->pdf->MultiCell(200, 2, "TERMINOS Y CONDICIONES", 0, '', 0, "L");

                            $this->pdf->Ln(3);
                            $this->pdf->SetFont('helvetica', '', 6);
                            $this->pdf->MultiCell(206, 0, $prot_orde, 1, 'J', 0, "L");
                            //pagina    
                            $this->pdf->SetFont('helvetica', 'B', 7);
                            $this->pdf->SetXY(190, 265);
                            $this->pdf->Cell(0, 5, "PAG :", 1, 0, "L");

                            $this->pdf->SetXY(198, 265);
                            $this->pdf->SetFont('helvetica', '', 7);
                            $this->pdf->Cell(0, 5, "3 / 3", 0, 0, "L");
                            //usuario
                            $this->pdf->SetFont('helvetica', 'B', 7);
                            $this->pdf->SetXY(2, 265);
                            $this->pdf->Cell(50, 5, "USUARIO :", 1, 0, "L");

                            $this->pdf->SetXY(17, 265);
                            $this->pdf->SetFont('helvetica', '', 7);
                            $this->pdf->Cell(0, 5, "$acti_usua", 0, 0, "L");
                            //fecha impresion
                            $this->pdf->SetFont('helvetica', 'B', 7);
                            $this->pdf->SetXY(52, 265);
                            $this->pdf->Cell(138, 5, "FECHA DE IMPRESION :", 1, 0, "L");

                            $this->pdf->SetXY(85, 265);
                            $this->pdf->SetFont('helvetica', '', 7);
                            $this->pdf->Cell(0, 5, "$acti_hora", 0, 0, "L");
                        } else {
                            if ($tota_deta > 54 && $tota_deta <= 60) {
                                //     $this->pdf->AddPage("P", "A4");
                                $this->pdf->Ln(4);
                                $this->pdf->SetFont('helvetica', 'B', 7);
                                $this->pdf->MultiCell(200, 2, "TERMINOS Y CONDICIONES", 0, '', 0, "L");

                                $this->pdf->Ln(3);
                                $this->pdf->SetFont('helvetica', '', 6);
                                $this->pdf->MultiCell(206, 0, $prot_orde, 1, 'J', 0, "L");
                                //pagina    
                                $this->pdf->SetFont('helvetica', 'B', 7);
                                $this->pdf->SetXY(190, 265);
                                $this->pdf->Cell(0, 5, "PAG :", 1, 0, "L");

                                $this->pdf->SetXY(198, 265);
                                $this->pdf->SetFont('helvetica', '', 7);
                                $this->pdf->Cell(0, 5, "3 / 3", 0, 0, "L");
                                //usuario
                                $this->pdf->SetFont('helvetica', 'B', 7);
                                $this->pdf->SetXY(2, 265);
                                $this->pdf->Cell(50, 5, "USUARIO :", 1, 0, "L");

                                $this->pdf->SetXY(17, 265);
                                $this->pdf->SetFont('helvetica', '', 7);
                                $this->pdf->Cell(0, 5, "$acti_usua", 0, 0, "L");
                                //fecha impresion
                                $this->pdf->SetFont('helvetica', 'B', 7);
                                $this->pdf->SetXY(52, 265);
                                $this->pdf->Cell(138, 5, "FECHA DE IMPRESION :", 1, 0, "L");

                                $this->pdf->SetXY(85, 265);
                                $this->pdf->SetFont('helvetica', '', 7);
                                $this->pdf->Cell(0, 5, "$acti_hora", 0, 0, "L");
                            } else {
                                $this->pdf->AddPage("P", "A4");
                                $this->pdf->Ln(4);
                                $this->pdf->SetFont('helvetica', 'B', 7);
                                $this->pdf->MultiCell(200, 2, "TERMINOS Y CONDICIONES", 0, '', 0, "L");

                                $this->pdf->Ln(3);
                                $this->pdf->SetFont('helvetica', '', 6);
                                $this->pdf->MultiCell(206, 0, $prot_orde, 1, 'J', 0, "L");
                                //pagina    
                                $this->pdf->SetFont('helvetica', 'B', 7);
                                $this->pdf->SetXY(190, 265);
                                $this->pdf->Cell(0, 5, "PAG :", 1, 0, "L");

                                $this->pdf->SetXY(198, 265);
                                $this->pdf->SetFont('helvetica', '', 7);
                                $this->pdf->Cell(0, 5, "2 / 2", 0, 0, "L");
                                //usuario
                                $this->pdf->SetFont('helvetica', 'B', 7);
                                $this->pdf->SetXY(2, 265);
                                $this->pdf->Cell(50, 5, "USUARIO :", 1, 0, "L");

                                $this->pdf->SetXY(17, 265);
                                $this->pdf->SetFont('helvetica', '', 7);
                                $this->pdf->Cell(0, 5, "$acti_usua", 0, 0, "L");
                                //fecha impresion
                                $this->pdf->SetFont('helvetica', 'B', 7);
                                $this->pdf->SetXY(52, 265);
                                $this->pdf->Cell(138, 5, "FECHA DE IMPRESION :", 1, 0, "L");

                                $this->pdf->SetXY(85, 265);
                                $this->pdf->SetFont('helvetica', '', 7);
                                $this->pdf->Cell(0, 5, "$acti_hora", 0, 0, "L");
                                //acaba footer
                            }
                        }
                    }
                }
            }
            $this->pdf->Output($dire_arch, "F");
            //copy($dire_arch, $temp_dire_arch);
            //   $validar['html'] = $nomb_arch;

            /*
              $de = "No Responder <noresponder@dupree.com.co>";
              $para_mens = $corr_apro;
              $asun_mens = "APROBAR ORDEN DE COMPRA";
              $desc_mens = "Buen Dia Sr(a). " . mb_strtoupper(trim($nomb_empl), 'UTF-8') . "<br><br>";
              $desc_mens .="Se adjunta OC para su respectiva revision y aprobacion a traves del modulo APROBACION DE ORDENES <br><br>";
              $desc_mens .="Al cual puede acceder ingresando por el navegador FireFox al siguiente link:  <br><br>";
              $desc_mens .="http://perudb.dupree.per/desarrollo/hmvc/ <br><br>.";
              $desc_mens .="Gracias<br><br>.";
              $file_name_area = TEMPORAL . $nomb_arch;
              enviar_correo($de, $para_mens, $asun_mens, $desc_mens, $file_name_area);
             */

            return "Se genero el pdf";
        }




        //  echo json_encode($validar);
    }

}
