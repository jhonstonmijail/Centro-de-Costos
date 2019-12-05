<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
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
        if ($this->codi_usua == "") {
            redirect('/', 'refresh');
        }
    }
    public function admi_asig_perm(){
      $this->load->view('asig_perm.php');
    }
    public function admi_asig_perm_form(){
        $this->load->view('asig_perm_form.php');
    }
    public function admi_asig_perm_gene(){
        $validar    = array ('mensaje'=>'','data'=> array());
        $this->load->model('prog');
        $data = $this->prog->prog_sele();
        if(count($data)== 0){
            $validar['mensaje'] = "* ERROR LISTA VACIA." ;
        }else{
            for($i=0;$i < count($data);$i++){
                $validar['data'][] = array(
                    'cons_fila' => $i + 1,
                    'cons_prog' => mb_strtoupper(trim($data[$i]->cons_prog), 'UTF-8'),
                    'codi_prog' => mb_strtoupper(trim($data[$i]->codi_prog), 'UTF-8'),
                    'nomb_prog' => mb_strtoupper(trim($data[$i]->nomb_prog), 'UTF-8'),
                    'ruta_prog' => mb_strtoupper(trim($data[$i]->ruta_prog), 'UTF-8')
                );
            }
        }
        echo json_encode($validar);
    }
    public function admi_asig_perm_codi_usua(){
        $validar    = array ('mensaje'=>'','data'=> array());
        $codi_usua  =  trim(strtolower($_REQUEST['codi_usua']));
        $this->load->model('usua');
        $data = $this->usua->usua_sele($codi_usua);
        if(count($data)== 0){
            $validar['mensaje'] = "* ERROR USUARIO NO EXISTE." ;
        }else{
            $data_prog = $this->usua->usua_prog_sele($codi_usua);
            if(count($data_prog) > 0){
                for($i=0;$i < count($data_prog);$i++){
                    $validar['data'][] = array(
                        'cons_fila' => $i + 1,
                        'cons_prog' => mb_strtoupper(trim($data_prog[$i]->cons_prog), 'UTF-8'),
                        'codi_prog' => mb_strtoupper(trim($data_prog[$i]->codi_prog), 'UTF-8'),
                        'nomb_prog' => mb_strtoupper(trim($data_prog[$i]->nomb_prog), 'UTF-8'),
                        'ruta_prog' => mb_strtoupper(trim($data_prog[$i]->ruta_prog), 'UTF-8')
                    );
                }
            }
        }
        echo json_encode($validar);
    }
  
    public function admi_asig_perm_nomb_usua() {
        $validar    = array ('mensaje'=>'','data'=> array());
       
        $this->load->model('usua');
        $data = $this->usua->usua_list();
       
            if(count($data) > 0){
                for($i=0;$i < count($data);$i++){
                    $validar['data'][] = array(
                        'codi_usua' => trim($data[$i]->codi_usua),
                    );
                }
            }
        
        echo json_encode($validar);
    }
    public function admi_asig_perm_elim_usua(){
        $validar    = array ('mensaje'=>'','data'=> array());
        $codi_usua  =  trim(strtolower($_REQUEST['codi_usua']));
        $this->load->model('usua');
        $this->usua->usua_prog_elim($codi_usua);
        echo json_encode($validar);
    }
    public function admi_asig_perm_codi_prog(){
        $validar    = array ('mensaje'=>'','data'=> array());
        $cons_prog  =  mb_strtoupper(trim(strtolower($_REQUEST['cons_prog'])), 'UTF-8');
        $codi_usua  =  trim(strtolower($_REQUEST['codi_usua']));
        $acti_usua  = $this->codi_usua;
        $this->load->model('usua');
        $this->usua->usua_prog_regi($codi_usua,$cons_prog,$acti_usua);
        echo json_encode($validar);
    }
}