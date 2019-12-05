<?php
class Perf extends CI_Model {
    function __construct(){
        parent::__construct();
    }
    function perf_regi($tipo_esta,$codi_esta,$nomb_esta,$acti_esta,$codi_usua){
        $query_dirty = " SET TRANSACTION ISOLATION LEVEL SERIALIZABLE ";
        $this->db->query($query_dirty);

        if($tipo_esta == "1"){
            $query = "update tab_perf set
                        nomb_perf = '$nomb_esta',
                        acti_usua = '$codi_usua',
                        esta_perf = '$acti_esta',
                        acti_hora = NOW()
                     where cons_perf = '$codi_esta'";
        }else{
            $query = "insert into tab_perf (
                        nomb_perf,
                        acti_usua,
                        esta_perf,
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
    function perf_sele($codi_esta=''){
        $query_dirty = " SET TRANSACTION ISOLATION LEVEL SERIALIZABLE ";
        $this->db->query($query_dirty);

        $query  = "SELECT * FROM tab_perf WHERE 1 = 1 ";
        if($codi_esta != ""){
            $query .= "and cons_perf = '$codi_esta'";
        }

        $stm = $this->db->query($query);

        return $stm->result();
    }






}
