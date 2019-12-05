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

    public function admi_crea_clie() {
        $this->load->view('crea_clie.php');
    }

    public function admi_crea_clie_form() {
        $this->load->view('crea_clie_form.php');
    }

    public function admi_crea_clie_deta_form() {
        $this->load->view('crea_clie_deta_form.php');
    }

    public function admi_crea_clie_clie_list() {
        $validar = array('data' => '', 'mensaje' => '');
        $this->load->model('clie');
        $data = $this->clie->clie_deta_list();
        if (count($data) > 0) {
            for ($i = 0; $i < count($data); $i++) {
                $validar['data'][] = array(
                    'codi_clie' => mb_strtoupper(trim($data[$i]->cons_clie), 'UTF-8'),
                    'nomb_clie' => mb_strtoupper(trim($data[$i]->nomb_clie), 'UTF-8'),
                    'cont_clie' => mb_strtoupper(trim($data[$i]->cont_clie), 'UTF-8'),
                    'telf_clie' => mb_strtoupper(trim($data[$i]->telf_clie)),
                    'corr_clie' => mb_strtoupper(trim($data[$i]->corr_clie)),
                    'esta_clie' => mb_strtoupper(trim($data[$i]->esta_clie), 'UTF-8')
                );
            }
        }
        echo json_encode($validar);
    }

    public function admi_crea_clie_codi_clie() {
        $validar = array('data' => array(), 'mensaje' => '');
        $codi_clie = mb_strtoupper(trim($_REQUEST['codi_clie']), 'UTF-8');
        $this->load->model('clie');
        $data = $this->clie->clie_sele($codi_clie);
        if (count($data) > 0) {
            for ($i = 0; $i < count($data); $i++) {
                $validar['data'][] = array(
                    'codi_clie' => mb_strtoupper(trim($data[$i]->cons_clie)),
                    'nomb_clie' => mb_strtoupper(trim($data[$i]->nomb_clie), 'UTF-8'),
                    'cont_clie' => mb_strtoupper(trim($data[$i]->cont_clie), 'UTF-8'),
                    'telf_clie' => mb_strtoupper(trim($data[$i]->telf_clie)),
                    'corr_clie' => mb_strtoupper(trim($data[$i]->corr_clie)),
                    'esta_clie' => mb_strtoupper(trim($data[$i]->esta_clie), 'UTF-8')
                );
            }
        }
        echo json_encode($validar);
    }

    public function admi_crea_clie_regi() {
        $validar = array('mensaje' => '', 'data' => '');

        $codi_clie = trim(mb_strtoupper($_REQUEST['codi_clie']));

        $nomb_clie = trim(mb_strtoupper($_REQUEST['nomb_clie'], 'UTF-8'));

        $telf_clie = mb_strtoupper(trim($_REQUEST['telf_clie']));
        $cont_clie = mb_strtoupper(trim($_REQUEST['cont_clie']));
        $esta_clie = trim(mb_strtoupper($_REQUEST['esta_clie']));

        $corr_clie = trim(mb_strtoupper($_REQUEST['corr_clie']));
        $acti_usua = trim($this->codi_usua);
        $esta_form = trim(mb_strtoupper($_REQUEST['esta_form']));
        $this->load->model('clie');



        if ($nomb_clie == '') {
            $validar['mensaje'] = "* ERROR EL CAMPO NOMBRE ES OBLIGATORIO.";
        } else {


            if ($telf_clie == "") {
                $validar['mensaje'] = "* ERROR EL CAMPO TELEFONO ES OBLIGATORIO.";
            } else {
                //if (!is_numeric($telf_clie)) {
                //    $validar['mensaje'] = "* ERROR EL CAMPO TELEFONO DEBE SER NUMERICO.";
                //} else {
                if ($cont_clie == "") {
                    $validar['mensaje'] = "* ERROR EL CAMPO CONTACTO ES OBLIGATORIO.";
                } else {


                    if ($corr_clie == "") {
                        $validar['mensaje'] = "* ERROR EL CAMPO CORREO ES OBLIGATORIO.";
                    } else {
                        if ($esta_clie == "") {
                            $validar['mensaje'] = "* ERROR EL CAMPO ESTADO ES OBLIGATORIO.";
                        } else {
                            $corr_clie = limp_cara_espe($corr_clie);
                            if (!filter_var($corr_clie, FILTER_VALIDATE_EMAIL)) {
                                $validar['mensaje'] = "* ERROR EL CORREO INGRESADO NO ES VALIDO.";
                            }
                        }
                    }


                    // }
                }
            }
        }
        if ($validar['mensaje'] == "") {
            $this->clie->clie_regi($codi_clie, $nomb_clie,$cont_clie, $telf_clie, $corr_clie, $esta_clie, $acti_usua, $esta_form);
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
