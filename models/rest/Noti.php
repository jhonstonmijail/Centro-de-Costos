<?php
class Noti extends CI_Model {
    function __construct(){
        parent::__construct(); 
    }
  
    function list_noti(){
        
        $query_dirty = " SET TRANSACTION ISOLATION LEVEL SERIALIZABLE ";
        $this->db->query($query_dirty);
        $query = "select * from noti_corp where esta_noti = 'ACT'";
         $stm = $this->db->query($query);
        return $stm->result();
    }
 
}