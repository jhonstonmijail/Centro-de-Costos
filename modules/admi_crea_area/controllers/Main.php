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
    public function crea_area(){
        $this->load->view('crea_area.php');
    }
    public function crea_area_form(){
        $this->load->view('crea_area_form.php');
    }
    public function crea_area_deta_form(){
        $this->load->view('crea_area_deta_form.php');
    }
    
    public function crea_area_regi(){
        $validar = array('data'=>'','mensaje'=>'');
        $tipo_esta = trim($_REQUEST['tipo_area']);
        $codi_esta = mb_strtoupper($_REQUEST['codi_area']);
        $nomb_esta = mb_strtoupper($_REQUEST['nomb_area']);
        $acti_esta = mb_strtoupper($_REQUEST['acti_area']);
        

        if ($nomb_esta ==""){
            $validar['mensaje'] = "* ERROR CAMPO NOMBRE OBLIGATORIO.";
        }else{
            $this->load->model('area');
            $codi_usua = $this->codi_usua;
            $this->area->area_regi($tipo_esta,$codi_esta,$nomb_esta,$acti_esta,$codi_usua);
        }
        echo json_encode($validar);
    }

    public function area_list(){
        $validar = array('data' => '','mensaje'=>'');
        $codi_esta =trim($_REQUEST['cons_area']);
        $this->load->model('area');
        $data = $this->area->area_sele($codi_esta);
        if (count($data)>0){
            for($i=0;$i<count($data);$i++){
                $validar['data'][]=array(
                    'codi_area' => mb_strtoupper(trim($data[$i]->cons_area), 'UTF-8'),
                    'nomb_area' => mb_strtoupper(trim($data[$i]->nomb_area), 'UTF-8'),
                    'acti_area' => mb_strtoupper(trim($data[$i]->esta_area), 'UTF-8')
                );
            }
        }
        echo json_encode($validar);
    }
}