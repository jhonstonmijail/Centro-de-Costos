<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
ini_set('memory_limit', '-1');
set_time_limit(0);
class Main extends MX_Controller{
    private $codi_usua;
    private $nomb_usua;
    public function __construct(){
        parent::__construct();
        $this->nomb_usua = $this->session->userdata('nomb_usua');
        $this->codi_usua = $this->session->userdata('codi_usua');
        if($this->codi_usua== ""){
            redirect('/', 'refresh');
        }
    }
    public function crea_perf(){
        $this->load->view('crea_perf.php');
    }
    public function crea_perf_form(){
        $this->load->view('crea_perf_form.php');
    }
    public function crea_perf_deta_form(){
        $this->load->view('crea_perf_deta_form.php');
    }
    
    public function crea_perf_regi(){
        $validar = array('data'=>'','mensaje'=>'');
        $tipo_esta = trim($_REQUEST['tipo_perf']);
        $codi_esta = mb_strtoupper($_REQUEST['codi_perf']);
        $nomb_esta = mb_strtoupper($_REQUEST['nomb_perf']);
        $acti_esta = mb_strtoupper($_REQUEST['acti_perf']);
        

        if ($nomb_esta ==""){
            $validar['mensaje'] = "* ERROR CAMPO NOMBRE OBLIGATORIO.";
        }else{
            $this->load->model('perf');
            $codi_usua = $this->codi_usua;
            $this->perf->perf_regi($tipo_esta,$codi_esta,$nomb_esta,$acti_esta,$codi_usua);
        }
        echo json_encode($validar);
    }

    public function perf_list(){
        $validar = array('data' => '','mensaje'=>'');
        $codi_esta =trim($_REQUEST['cons_perf']);
        $this->load->model('perf');
        $data = $this->perf->perf_sele($codi_esta);
        if (count($data)>0){
            for($i=0;$i<count($data);$i++){
                $validar['data'][]=array(
                    'codi_perf' => mb_strtoupper(trim($data[$i]->cons_perf), 'UTF-8'),
                    'nomb_perf' => mb_strtoupper(trim($data[$i]->nomb_perf), 'UTF-8'),
                    'acti_perf' => mb_strtoupper(trim($data[$i]->esta_perf), 'UTF-8')
                );
            }
        }
        echo json_encode($validar);
    }
}