<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
ini_set('memory_limit', '-1');
set_time_limit(0);
class Main extends MX_Controller {
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
    public function copi_perm(){
        $this->load->view('copi_perm.php');
    }
    public function copi_perm_form(){
        $this->load->view('copi_perm_form.php');
    }
    public function copi_perm_gene(){
        $validar    = array ('mensaje'=>'','data'=> array());
        $this->load->model('usua');
        $data = $this->usua->usua_sele();
        if(count($data)== 0){
            $validar['mensaje'] = "* ERROR LISTA VACIA." ;
        }else{
            for($i=0;$i < count($data);$i++){
                $validar['data'][] = array(
                    'cons_fila' => $i + 1,
                    'codi_usua' => mb_strtoupper(trim($data[$i]->codi_usua), 'UTF-8'),
                    'nomb_usua' => mb_strtoupper(trim($data[$i]->nomb_usua), 'UTF-8'),
                    'apel_usua' => mb_strtoupper(trim($data[$i]->apel_usua), 'UTF-8')
                );
            }
        }
        echo json_encode($validar);
    }
    public function copi_perm_codi_usua(){
        $validar    = array ('mensaje'=>'','data'=> array());
        $codi_usua  =  trim(strtolower($_REQUEST['codi_usua']));
        $this->load->model('usua');
        $data = $this->usua->usua_sele($codi_usua);
        if(count($data)== 0){
            $validar['mensaje'] = "* ERROR EL USUARIO NO EXISTE." ;
        }else{
            $data_prog = $this->usua->usua_prog_sele($codi_usua);
            if(count($data_prog)== 0){
                $validar['mensaje'] = "* ERROR El USUARIO NO TIENE MODULOS ASIGNADOS." ;
            }
            
        }
        echo json_encode($validar);
    }

    public function copi_perm_regi(){
        $validar        = array ('mensaje'=>'','data'=> array());
        $codi_usua_copi =  trim(strtolower($_REQUEST['codi_usua_copi']));
        $codi_usua      =  trim(strtolower($_REQUEST['codi_usua']));
        $acti_usua      = $this->codi_usua;
        $rand = rand(0, 90000000);
        $this->load->model('usua');
        $this->usua->usua_prog_elim($codi_usua_copi);
        $this->usua->usua_prog_regi($codi_usua,$codi_usua_copi,$acti_usua,$rand);
        echo json_encode($validar);
    }
    
    public function admi_copi_perm_nomb_usua() {
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
}
