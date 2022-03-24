<?php

class usuario{

    //Declaramos los atributos de nuestro usuario
    private $idUsuario;
    private $nombre;
    private $apellidos;
    private $nickname;
    private $fecha_nacimiento;
    private $telefono;
    private $correo;
    private $permiso;
    private $contrasena;

    /**
     * usuario constructor.
     * @param $idUsuario
     * @param $nombre
     * @param $apellidos
     * @param $nickname
     * @param $fecha_nacimiento
     * @param $telefono
     * @param $correo
     * @param $permiso
     * @param $contrasena
     */
    public function __construct($idUsuario, $nombre, $apellidos, $nickname, $fecha_nacimiento, $telefono, $correo, $permiso, $contrasena)
    {
        $this->idUsuario = $idUsuario;
        $this->nombre = $nombre;
        $this->apellidos = $apellidos;
        $this->nickname = $nickname;
        $this->fecha_nacimiento = $fecha_nacimiento;
        $this->telefono = $telefono;
        $this->correo = $correo;
        $this->permiso = $permiso;
        $this->contrasena = $contrasena;
    }

    /**
     * @return mixed
     */
    public function getIdUsuario()
    {
        return $this->idUsuario;
    }

    /**
     * @param mixed $idUsuario
     */
    public function setIdUsuario($idUsuario)
    {
        $this->idUsuario = $idUsuario;
    }

    /**
     * @return mixed
     */
    public function getNombre()
    {
        return $this->nombre;
    }

    /**
     * @param mixed $nombre
     */
    public function setNombre($nombre)
    {
        $this->nombre = $nombre;
    }

    /**
     * @return mixed
     */
    public function getApellidos()
    {
        return $this->apellidos;
    }

    /**
     * @param mixed $apellidos
     */
    public function setApellidos($apellidos)
    {
        $this->apellidos = $apellidos;
    }

    /**
     * @return mixed
     */
    public function getNickname()
    {
        return $this->nickname;
    }

    /**
     * @param mixed $nickname
     */
    public function setNickname($nickname)
    {
        $this->nickname = $nickname;
    }

    /**
     * @return mixed
     */
    public function getFechaNacimiento()
    {
        return $this->fecha_nacimiento;
    }

    /**
     * @param mixed $fecha_nacimiento
     */
    public function setFechaNacimiento($fecha_nacimiento)
    {
        $this->fecha_nacimiento = $fecha_nacimiento;
    }

    /**
     * @return mixed
     */
    public function getTelefono()
    {
        return $this->telefono;
    }

    /**
     * @param mixed $telefono
     */
    public function setTelefono($telefono)
    {
        $this->telefono = $telefono;
    }

    /**
     * @return mixed
     */
    public function getCorreo()
    {
        return $this->correo;
    }

    /**
     * @param mixed $correo
     */
    public function setCorreo($correo)
    {
        $this->correo = $correo;
    }

    /**
     * @return mixed
     */
    public function getPermiso()
    {
        return $this->permiso;
    }

    /**
     * @param mixed $permiso
     */
    public function setPermiso($permiso)
    {
        $this->permiso = $permiso;
    }

    /**
     * @return mixed
     */
    public function getContrasena()
    {
        return $this->contrasena;
    }

    /**
     * @param mixed $contrasena
     */
    public function setContrasena($contrasena)
    {
        $this->contrasena = $contrasena;
    }


}
?>