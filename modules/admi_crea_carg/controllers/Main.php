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
    public function crea_carg(){
        $this->load->view('crea_carg.php');
    }
    public function crea_carg_form(){
        $this->load->view('crea_carg_form.php');
    }
    public function crea_carg_deta_form(){
        $this->load->view('crea_carg_deta_form.php');
    }
    
    public function crea_carg_regi(){
        $validar = array('data'=>'','mensaje'=>'');
        $tipo_esta = trim($_REQUEST['tipo_carg']);
        $codi_esta = mb_strtoupper($_REQUEST['codi_carg']);
        $nomb_esta = mb_strtoupper($_REQUEST['nomb_carg']);
        $acti_esta = mb_strtoupper($_REQUEST['acti_carg']);
        

        if ($nomb_esta ==""){
            $validar['mensaje'] = "* ERROR CAMPO NOMBRE OBLIGATORIO.";
        }else{
            $this->load->model('carg');
            $codi_usua = $this->codi_usua;
            $this->carg->carg_regi($tipo_esta,$codi_esta,$nomb_esta,$acti_esta,$codi_usua);
        }
        echo json_encode($validar);
    }

    public function carg_list(){
        $validar = array('data' => '','mensaje'=>'');
        $codi_esta =trim($_REQUEST['cons_carg']);
        $this->load->model('carg');
        $data = $this->carg->carg_sele($codi_esta);
        if (count($data)>0){
            for($i=0;$i<count($data);$i++){
                $validar['data'][]=array(
                    'codi_carg' => mb_strtoupper(trim($data[$i]->cons_carg), 'UTF-8'),
                    'nomb_carg' => mb_strtoupper(trim($data[$i]->nomb_carg), 'UTF-8'),
                    'acti_carg' => mb_strtoupper(trim($data[$i]->esta_carg), 'UTF-8')
                );
            }
        }
        echo json_encode($validar);
    }
}