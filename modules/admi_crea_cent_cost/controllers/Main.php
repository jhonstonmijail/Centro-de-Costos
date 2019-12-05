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

    public function admi_crea_cent_cost() {
        $this->load->view('crea_cent_cost.php');
    }

    public function admi_crea_cent_cost_form() {
        $this->load->view('crea_cent_cost_form.php');
    }

    public function admi_crea_cent_cost_deta_form() {
        $this->load->view('crea_cent_cost_deta_form.php');
    }

    public function admi_crea_cent_cost_list() {
        $validar = array('data' => '', 'mensaje' => '');
        $this->load->model('cent');
        $data = $this->cent->cent_list();
        if (count($data) > 0) {
            for ($i = 0; $i < count($data); $i++) {
                $validar['data'][] = array(
                    'codi_cent' => mb_strtoupper(trim($data[$i]->codi_cent), 'UTF-8'),
                    'nomb_cent' => mb_strtoupper(trim($data[$i]->nomb_cent), 'UTF-8'),
                    'esta_cent' => mb_strtoupper(trim($data[$i]->esta_cent), 'UTF-8')
                );
            }
        }
        echo json_encode($validar);
    }

    public function admi_crea_cent_cost_codi_cent() {
        $validar = array('data' => array(), 'mensaje' => '');
        $codi_cent = mb_strtoupper(trim($_REQUEST['codi_cent']), 'UTF-8');
        $this->load->model('cent');
        $data = $this->cent->cent_sele($codi_cent);
        if (count($data) > 0) {
            for ($i = 0; $i < count($data); $i++) {
                $validar['data'][] = array(
                    'codi_cent' => mb_strtoupper(trim($data[$i]->codi_cent), 'UTF-8'),
                    'nomb_cent' => mb_strtoupper(trim($data[$i]->nomb_cent), 'UTF-8'),
                    'esta_cent' => mb_strtoupper(trim($data[$i]->esta_cent), 'UTF-8')
                );
            }
        }
        echo json_encode($validar);
    }

    public function admi_crea_cent_cost_regi() {
        $validar = array('mensaje' => '', 'data' => '');

        $codi_cent = trim(mb_strtoupper($_REQUEST['codi_cent']));

        $nomb_cent = trim(mb_strtoupper($_REQUEST['nomb_cent'], 'UTF-8'));

        $esta_cent = trim(mb_strtoupper($_REQUEST['esta_cent']));

        $acti_usua = trim($this->codi_usua);
        $esta_form = trim(mb_strtoupper($_REQUEST['esta_form']));
        $this->load->model('cent');

        if ($codi_cent == '') {
            $validar['mensaje'] = "* ERROR EL CAMPO CODIGO ES OBLIGATORIO.";
        } else {

            if ($nomb_cent == '') {
                $validar['mensaje'] = "* ERROR EL CAMPO PROVEEDOR ES OBLIGATORIO.";
            } else {

                if ($esta_cent == "") {
                    $validar['mensaje'] = "* ERROR EL CAMPO ESTADO ES OBLIGATORIO.";
                }
            }
        }
        if ($validar['mensaje'] == "") {
            $this->cent->cent_regi($codi_cent, $nomb_cent, $esta_cent,$esta_cent, $acti_usua, $esta_form);
        }
        echo json_encode($validar);
    }

}

