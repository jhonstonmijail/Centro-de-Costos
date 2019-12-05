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

    public function orde_serv() {

        $this->load->view('orde_serv.php');
    }

    public function orde_serv_form() {

        $this->load->view('orde_serv_form.php');
    }

    public function orde_serv_gene() {
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

                if ($data[$i]->esta_orde == "PEN") {
                    $desc_esta = "PENDIENTE";
                } else {
                    if ($data[$i]->esta_orde == "APR") {
                        $desc_esta = "APROBADO";
                    } else {
                        $desc_esta = "DESAPROBADO";
                    }
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
                    'tipo_mone' => mb_strtoupper(trim($tipo_mone), 'UTF-8'),
                    'esta_orde' => $desc_esta
                );
            }
        }
        echo json_encode($validar);
    }

}
