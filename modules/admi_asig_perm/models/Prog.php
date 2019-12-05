<?php
class Prog extends CI_Model {
    function __construct(){
        parent::__construct(); 
    }
    function prog_sele(){
        $query_dirty = " SET TRANSACTION ISOLATION LEVEL SERIALIZABLE ";
        $this->db->query($query_dirty);
       
        $query  = "SELECT
                        tab_prog.cons_prog,
                        tab_prog.codi_prog,
                        tab_prog.nomb_prog,
                        tab_prog.esta_prog,
                        tab_prog.padr_prog,
                        tab_prog.clic_prog,
                        tab_prog.ruta_prog,
                        tab_prog.tama_prog ";
        $query .= "FROM tab_prog ";
        $query .= "WHERE tab_prog.clic_prog = 'ACT' and tab_prog.esta_prog = 'ACT' and tab_prog.publ_prog = 'NO' ";
        $query .= "ORDER BY tab_prog.codi_prog ";
        $stm = $this->db->query($query);
        return $stm->result();
    } 
   
}