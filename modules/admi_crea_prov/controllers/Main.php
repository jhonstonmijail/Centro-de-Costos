<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');
ini_set('memory_limit', '-1');
set_time_limit(0);

class Main extends MX_Controller {

    private $codi_usua;
    private $nomb_usua;

    public function __construct() {
        parent::__construct();
        $this->nomb_usua = $this->session->userdata('nomb_usua');
        $this->codi_usua = $this->session->userdata('codi_usua');
        if ($this->codi_usua == "") {
            redirect('/', 'refresh');
        }
    }

    public function admi_crea_prov() {
        $this->load->view('crea_prov.php');
    }

    public function admi_crea_prov_form() {
        $this->load->view('crea_prov_form.php');
    }

    public function admi_crea_prov_deta_form() {
        $this->load->view('crea_prov_deta_form.php');
    }

    public function admi_crea_prov_prov_list() {
        $validar = array('data' => '', 'mensaje' => '');
        $this->load->model('prov');
        $data = $this->prov->prov_deta_list();
        if (count($data) > 0) {
            for ($i = 0; $i < count($data); $i++) {
                $validar['data'][] = array(
                    'nume_rucc' => mb_strtoupper(trim($data[$i]->nume_rucc), 'UTF-8'),
                    'nomb_prov' => mb_strtoupper(trim($data[$i]->nomb_prov), 'UTF-8'),
                    'dire_prov' => mb_strtoupper(trim($data[$i]->dire_prov)),
                    'telf_prov' => mb_strtoupper(trim($data[$i]->telf_prov)),
                    'cont_prov' => mb_strtoupper(trim($data[$i]->cont_prov), 'UTF-8'),
                    'corr_prov' => mb_strtoupper(trim($data[$i]->corr_prov)),
                    'esta_prov' => mb_strtoupper(trim($data[$i]->esta_prov), 'UTF-8')
                );
            }
        }
        echo json_encode($validar);
    }

    public function admi_crea_prov_nume_rucc() {
        $validar = array('data' => array(), 'mensaje' => '');
        $nume_rucc = mb_strtoupper(trim($_REQUEST['nume_rucc']), 'UTF-8');
        $this->load->model('prov');
        $data = $this->prov->prov_sele($nume_rucc);
        if (count($data) > 0) {
            for ($i = 0; $i < count($data); $i++) {
                $validar['data'][] = array(
                    'nume_rucc' => mb_strtoupper(trim($data[$i]->nume_rucc)),
                    'nomb_prov' => mb_strtoupper(trim($data[$i]->nomb_prov), 'UTF-8'),
                    'dire_prov' => mb_strtoupper(trim($data[$i]->dire_prov), 'UTF-8'),
                    'telf_prov' => mb_strtoupper(trim($data[$i]->telf_prov)),
                    'acti_prov' => mb_strtoupper(trim($data[$i]->acti_prov), 'UTF-8'),
                    'cont_prov' => mb_strtoupper(trim($data[$i]->cont_prov), 'UTF-8'),
                    'corr_prov' => mb_strtoupper(trim($data[$i]->corr_prov)),
                    'esta_prov' => mb_strtoupper(trim($data[$i]->esta_prov), 'UTF-8')
                );
            }
        }
        echo json_encode($validar);
    }

    public function admi_crea_prov_regi() {
        $validar = array('mensaje' => '', 'data' => '');

        $nume_rucc = trim(mb_strtoupper($_REQUEST['nume_rucc']));

        $nomb_prov = trim(mb_strtoupper($_REQUEST['nomb_prov'], 'UTF-8'));
        $dire_prov = trim(mb_strtoupper($_REQUEST['dire_prov']));
        $telf_prov = mb_strtoupper(trim($_REQUEST['telf_prov']));
        $cont_prov = mb_strtoupper(trim($_REQUEST['cont_prov']));
        $esta_prov = trim(mb_strtoupper($_REQUEST['esta_prov']));
        $acti_prov = mb_strtolower(trim($_REQUEST['acti_prov'], 'UTF-8'));
        $corr_prov = trim(mb_strtoupper($_REQUEST['corr_prov']));
        $acti_usua = trim($this->codi_usua);
        $esta_form = trim(mb_strtoupper($_REQUEST['esta_form']));
        $this->load->model('prov');

        if ($nume_rucc == '') {
            $validar['mensaje'] = "* ERROR EL CAMPO RUC ES OBLIGATORIO.";
        } else {
            if (!is_numeric($nume_rucc)) {
                $validar['mensaje'] = "* ERROR EL CAMPO RUC DEBE SER NUMERICO.";
            } else {
                if ($nomb_prov == '') {
                    $validar['mensaje'] = "* ERROR EL CAMPO PROVEEDOR ES OBLIGATORIO.";
                } else {
                    if ($dire_prov == '') {
                        $validar['mensaje'] = "* ERROR EL CAMPO DIRECCION ES OBLIGATORIO.";
                    } else {

                        if ($telf_prov == "") {
                            $validar['mensaje'] = "* ERROR EL CAMPO TELEFONO ES OBLIGATORIO.";
                        } else {
                            //if (!is_numeric($telf_prov)) {
                            //    $validar['mensaje'] = "* ERROR EL CAMPO TELEFONO DEBE SER NUMERICO.";
                            //} else {
                                if ($cont_prov == "") {
                                    $validar['mensaje'] = "* ERROR EL CAMPO CONTACTO ES OBLIGATORIO.";
                                } else {
                                    if ($acti_prov == "") {
                                        $validar['mensaje'] = "* ERROR EL CAMPO ACTIVIDAD ES OBLIGATORIO.";
                                    } else {

                                        if ($corr_prov == "") {
                                            $validar['mensaje'] = "* ERROR EL CAMPO CORREO ES OBLIGATORIO.";
                                        } else {
                                            if ($esta_prov == "") {
                                                $validar['mensaje'] = "* ERROR EL CAMPO ESTADO ES OBLIGATORIO.";
                                            } else {
                                                $corr_prov = limp_cara_espe($corr_prov);
                                                if (!filter_var($corr_prov, FILTER_VALIDATE_EMAIL)) {
                                                    $validar['mensaje'] = "* ERROR EL CORREO INGRESADO NO ES VALIDO.";
                                                }
                                            }
                                        }
                                    }
                                }
                           // }
                        }
                    }
                }
            }
        }
        if ($validar['mensaje'] == "") {
            $this->prov->prov_regi($nume_rucc, $nomb_prov, $dire_prov, $telf_prov, $cont_prov, $acti_prov, $corr_prov, $esta_prov, $acti_usua, $esta_form);
        }
        echo json_encode($validar);
    }

}

function limp_cara_espe($datos) {
    $datos = str_replace("ñ", "n", $datos);
    $datos = str_replace("Ñ", "N", $datos);
    $datos = str_replace("<div>", "", $datos);
    $datos = str_replace("<DIV>", "", $datos);
    $datos = str_replace("<BR>", "", $datos);
    $datos = str_replace("É", "E", $datos);
    $datos = str_replace("Á", "A", $datos);
    $datos = str_replace("Í", "I", $datos);
    $datos = str_replace("Ú", "U", $datos);
    $datos = str_replace("Ó", "O", $datos);
    $datos = str_replace("â€‹", "", $datos);

    return $datos;
}
