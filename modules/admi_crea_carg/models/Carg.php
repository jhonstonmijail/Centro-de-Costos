<?php
class Carg extends CI_Model {
    function __construct(){
        parent::__construct();
    }
    function carg_regi($tipo_esta,$codi_esta,$nomb_esta,$acti_esta,$codi_usua){
        $query_dirty = " SET TRANSACTION ISOLATION LEVEL SERIALIZABLE ";
        $this->db->query($query_dirty);

        if($tipo_esta == "1"){
            $query = "update tab_carg set
                        nomb_carg = '$nomb_esta',
                        acti_usua = '$codi_usua',
                        esta_carg = '$acti_esta',
                        acti_hora = NOW()
                     where cons_carg = '$codi_esta'";
        }else{
            $query = "insert into tab_carg (
                        nomb_carg,
                        acti_usua,
                        esta_carg,
                        acti_hora
                    ) values (
                        '$nomb_esta',
                        '$codi_usua',
                        '$acti_esta',
                        NOW()
                    )";
        }
        $this->db->query($query);

        return "";
    }
    function carg_sele($codi_esta=''){
        $query_dirty = " SET TRANSACTION ISOLATION LEVEL SERIALIZABLE ";
        $this->db->query($query_dirty);

        $query  = "SELECT * FROM tab_carg WHERE 1 = 1 ";
        if($codi_esta != ""){
            $query .= "and cons_carg = '$codi_esta'";
        }

        $stm = $this->db->query($query);

        return $stm->result();
    }






}
