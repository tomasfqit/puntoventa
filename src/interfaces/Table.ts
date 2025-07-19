export interface Persona {
  id: number;
  nombres: string;
  apellidos?: string;
  identificacion: string;
  telefono?: string;
  correo?: string;
  direccion?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface Cliente {
  id: number;
  persona_id: number;
  tipo_cliente?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface Proveedor {
  id: number;
  persona_id: number;
  empresa?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface Usuario {
  id: number;
  persona_id: number;
  username: string;
  password: string;
  rol: string;
  rol_id: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}
export interface Categoria {
  id: number;
  nombre: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface Marca {
  id: number;
  nombre: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface Modelo {
  id: number;
  nombre: string;
  marca_id?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface Producto {
  id: number;
  nombre: string;
  descripcion?: string;
  categoria_id: number;
  marca_id: number;
  modelo_id: number;
  precio_venta: number;
  precio_compra: number;
  stock: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
  actions?: unknown;
}
export interface Almacen {
  id: number;
  nombre: string;
  direccion?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface Bodega {
  id: number;
  nombre: string;
  almacen_id: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface Inventario {
  id: number;
  producto_id: number;
  bodega_id: number;
  cantidad: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}
export interface CFactura {
  id: number;
  cliente_id: number;
  usuario_id: number;
  fecha: string;
  total: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface DFactura {
  id: number;
  cfactura_id: number;
  producto_id: number;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}
export interface MenuGrupo {
  id: number;
  titulo: string;
  orden?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface Menu {
  id: number;
  grupo_id: number;
  titulo: string;
  icono?: string;
  path: string;
  orden?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
  actions?: unknown;
}

export interface SubMenu {
  id: number;
  menu_id: number;
  titulo: string;
  path: string;
  orden?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface IDBTableRol {
  id?: number;
  nombre: string;
  descripcion: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
  actions?: unknown;
}

export interface RolMenu {
  id: number;
  rol_id: number;
  sub_menu_id: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}
