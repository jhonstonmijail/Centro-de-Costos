<?php
class Cent extends CI_Model {
    function __construct(){
        parent::__construct(); 
    }
    function cent_cost_gene(){
        $query_dirty = " SET TRANSACTION ISOLATION LEVEL SERIALIZABLE ";
        $this->db->query($query_dirty);
       
        $query  = "select   nume_cent , nomb_cent from tab_cent_cost where esta_cent = 'ACT'";
       
        
        $stm = $this->db->query($query);
        return $stm->result();
    } 
    function cent_list($nume_cent){
        $query_dirty = " SET TRANSACTION ISOLATION LEVEL SERIALIZABLE ";
        $this->db->query($query_dirty);
       
        $query  = "select   nume_cent ,nomb_cent, codi_cent from tab_cent_cost where esta_cent = 'ACT' and nume_cent = '$nume_cent'";
       
        
        $stm = $this->db->query($query);
        return $stm->result();
    } 
}