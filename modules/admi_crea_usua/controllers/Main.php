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

    public function admi_crea_usua() {
        $this->load->view('crea_usua.php');
    }

    public function admi_crea_usua_form() {
        $this->load->view('crea_usua_form.php');
    }

    public function admi_crea_usua_deta_form() {
        $this->load->view('crea_usua_deta_form.php');
    }

    public function admi_crea_usua_usua_list() {
        $validar = array('data' => '', 'mensaje' => '');
        $this->load->model('usua');
        $data = $this->usua->usua_deta_list();
        if (count($data) > 0) {
            for ($i = 0; $i < count($data); $i++) {
                $validar['data'][] = array(
                    'nume_iden' => mb_strtoupper(trim($data[$i]->nume_iden), 'UTF-8'),
                    'nomb_usua' => mb_strtoupper(trim($data[$i]->nomb_usua), 'UTF-8'),
                    'apel_usua' => mb_strtoupper(trim($data[$i]->apel_usua), 'UTF-8'),
                    'codi_usua' => mb_strtoupper(trim($data[$i]->codi_usua), 'UTF-8'),
                    'esta_usua' => mb_strtoupper(trim($data[$i]->esta_usua), 'UTF-8')
                );
            }
        }
        echo json_encode($validar);
    }

    public function crea_usua_area() {
        $validar = array('data' => '', 'mensaje' => '');
        $this->load->model('area');

        $data = $this->area->area_list();
        if (count($data) > 0) {
            for ($i = 0; $i < count($data); $i++) {
                $validar['data'][] = array(
                    'codi_area' => mb_strtoupper(trim($data[$i]->cons_area), 'UTF-8'),
                    'desc_area' => mb_strtoupper(trim($data[$i]->nomb_area), 'UTF-8')
                );
            }
        }
        echo json_encode($validar);
    }

    public function crea_usua_perf() {
        $validar = array('data' => '', 'mensaje' => '');
        $this->load->model('perf');

        $data = $this->perf->perf_list();
        if (count($data) > 0) {
            for ($i = 0; $i < count($data); $i++) {
                $validar['data'][] = array(
                    'codi_perf' => mb_strtoupper(trim($data[$i]->cons_perf), 'UTF-8'),
                    'desc_perf' => mb_strtoupper(trim($data[$i]->nomb_perf), 'UTF-8')
                );
            }
        }
        echo json_encode($validar);
    }

    public function crea_usua_carg() {
        $validar = array('data' => '', 'mensaje' => '');
        $this->load->model('carg');

        $data = $this->carg->carg_list();
        if (count($data) > 0) {
            for ($i = 0; $i < count($data); $i++) {
                $validar['data'][] = array(
                    'codi_carg' => mb_strtoupper(trim($data[$i]->cons_carg), 'UTF-8'),
                    'desc_carg' => mb_strtoupper(trim($data[$i]->nomb_carg), 'UTF-8')
                );
            }
        }
        echo json_encode($validar);
    }

    public function admi_crea_usua_nume_iden() {
        $validar = array('data' => array(), 'mensaje' => '');
        $nume_iden = mb_strtoupper(trim($_REQUEST['nume_iden']), 'UTF-8');
        $this->load->model('usua');
        $data = $this->usua->usua_sele($nume_iden);
        if (count($data) > 0) {
            for ($i = 0; $i < count($data); $i++) {
                $validar['data'][] = array(
                    'nume_iden' => mb_strtoupper(trim($data[$i]->nume_iden), 'UTF-8'),
                    'nomb_usua' => mb_strtoupper(trim($data[$i]->nomb_usua), 'UTF-8'),
                    'apel_usua' => mb_strtoupper(trim($data[$i]->apel_usua), 'UTF-8'),
                    'codi_usua' => mb_strtoupper(trim($data[$i]->codi_usua), 'UTF-8'),
                    'clav_usua' => mb_strtoupper(trim($data[$i]->clav_usua), 'UTF-8'),
                    'esta_usua' => mb_strtoupper(trim($data[$i]->esta_usua), 'UTF-8'),
                    'corr_usua' => mb_strtoupper(trim($data[$i]->corr_usua), 'UTF-8'),
                    'telf_usua' => mb_strtoupper(trim($data[$i]->telf_usua), 'UTF-8'),
                    'area_usua' => mb_strtoupper(trim($data[$i]->area_usua)),
                    'carg_usua' => mb_strtoupper(trim($data[$i]->carg_usua)),
                    'perf_usua' => mb_strtoupper(trim($data[$i]->perf_usua)),
                    'fech_ingr' => mb_strtoupper(trim($data[$i]->fech_ingr), 'UTF-8')
                );
            }
        }
        echo json_encode($validar);
    }

    public function admi_crea_usua_regi() {
        $validar = array('mensaje' => '', 'data' => '');

        $nume_iden = trim(mb_strtoupper($_REQUEST['nume_iden']));

        $nomb_usua = trim(mb_strtoupper($_REQUEST['nomb_usua'], 'UTF-8'));
        $apel_usua = trim(mb_strtoupper($_REQUEST['apel_usua'], 'UTF-8'));
        $codi_usua = mb_strtolower(trim($_REQUEST['codi_usua']));
        $clav_usua = mb_strtolower(trim($_REQUEST['clav_usua']));
        $esta_usua = trim(mb_strtoupper($_REQUEST['esta_usua'], 'UTF-8'));
        $corr_usua = mb_strtolower(trim($_REQUEST['corr_usua'], 'UTF-8'));
        $telf_usua = trim(mb_strtoupper($_REQUEST['telf_usua'], 'UTF-8'));
        $area_usua = trim(mb_strtoupper($_REQUEST['area_usua']));
        $carg_usua = trim(mb_strtoupper($_REQUEST['carg_usua']));
        $perf_usua = trim(mb_strtoupper($_REQUEST['perf_usua']));
        $fech_ingr_usua = trim(mb_strtoupper($_REQUEST['fech_ingr']));
        $repe_clav_usua = trim(mb_strtolower($_REQUEST['repe_clav_usua']));

        $acti_usua = trim($this->codi_usua);
        $esta_form = trim(mb_strtoupper($_REQUEST['esta_form'], 'UTF-8'));
        $this->load->model('usua');
        if ($nume_iden == '') {
            $validar['mensaje'] = "* ERROR EL CAMPO DNI ES OBLIGATORIO.";
        } else {
            if (!is_numeric($nume_iden)) {
                $validar['mensaje'] = "* ERROR EL CAMPO DNI DEBE SER NUMERICO.";
            } else {
                if ($nomb_usua == '') {
                    $validar['mensaje'] = "* ERROR EL CAMPO NOMBRE ES OBLIGATORIO.";
                } else {
                    if ($apel_usua == '') {
                        $validar['mensaje'] = "* ERROR EL CAMPO APELLIDO ES OBLIGATORIO.";
                    } else {
                        if ($corr_usua == "") {
                            $validar['mensaje'] = "* ERROR EL CAMPO CORREO ES OBLIGATORIO.";
                        } else {
                            if ($telf_usua == "") {
                                $validar['mensaje'] = "* ERROR EL CAMPO TELEFONO ES OBLIGATORIO.";
                            } else {
                                if (!is_numeric($telf_usua)) {
                                    $validar['mensaje'] = "* ERROR EL CAMPO TELEFONO DEBE SER NUMERICO.";
                                } else {
                                    if ($area_usua == "") {
                                        $validar['mensaje'] = "* ERROR EL CAMPO AREA ES OBLIGATORIO.";
                                    } else {
                                        if ($carg_usua == "") {
                                            $validar['mensaje'] = "* ERROR EL CAMPO CARGO ES OBLIGATORIO.";
                                        } else {
                                            if ($perf_usua == "") {
                                                $validar['mensaje'] = "* ERROR EL CAMPO PERFIL ES OBLIGATORIO.";
                                            } else {
                                                if ($codi_usua == "") {
                                                    $validar['mensaje'] = "* ERROR EL CAMPO USUARIO ES OBLIGATORIO.";
                                                } else {
                                                    if ($clav_usua == "") {
                                                        $validar['mensaje'] = "* ERROR EL CAMPO CLAVE ES OBLIGATORIO.";
                                                    } else {
                                                        if ($repe_clav_usua == "") {
                                                            $validar['mensaje'] = "* ERROR EL CAMPO REPETIR CLAVE ES OBLIGATORIO.";
                                                        } else {
                                                            if ($clav_usua != $repe_clav_usua) {
                                                                $validar['mensaje'] = "* ERROR LOS CAMPOS CLAVE Y  REPETIR CLAVE DEBEN SER IGUALES.";
                                                            } else {
                                                                if ($esta_usua == "") {
                                                                    $validar['mensaje'] = "* ERROR EL CAMPO ESTADO ES OBLIGATORIO.";
                                                                } else {
                                                                    $corr_usua = limp_cara_espe($corr_usua);
                                                                    if (!filter_var($corr_usua, FILTER_VALIDATE_EMAIL)) {
                                                                        $validar['mensaje'] = "* ERROR EL CORREO INGRESADO NO ES VALIDO.";
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if ($validar['mensaje'] == "") {
            $this->usua->usua_regi($nume_iden, $nomb_usua, $apel_usua, $corr_usua,$telf_usua,$fech_ingr_usua,$area_usua,$carg_usua,$perf_usua,$codi_usua, $clav_usua, $esta_usua, $acti_usua, $esta_form);
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
