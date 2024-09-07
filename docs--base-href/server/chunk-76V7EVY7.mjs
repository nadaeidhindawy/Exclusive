import './polyfills.server.mjs';
import{a as x}from"./chunk-YF4NBYE3.mjs";import{a as b,b as r,c as h,d as v,h as C,i as S,j as _,k as y,m as O}from"./chunk-CUYKWZQN.mjs";import"./chunk-CBYSDMSX.mjs";import{h as g}from"./chunk-DSEGMVXO.mjs";import{Bb as a,Ib as f,Pa as m,W as d,Z as c,eb as u,mb as t,nb as o,ob as l,tb as p}from"./chunk-QOKD6OM2.mjs";import"./chunk-5XUXGTUW.mjs";var G=(()=>{class n{_FormBuilder=d(y);_ActivatedRoute=d(g);_OrdersService=d(x);idCart="";orders=this._FormBuilder.group({details:[null,[r.required]],phone:[null,[r.required,r.pattern(/^01[0125][0-9]{8}$/)]],city:[null,[r.required]]});ngOnInit(){this._ActivatedRoute.paramMap.subscribe({next:e=>{console.log(e),this.idCart=e.get("id")},error:e=>{console.log(e)}})}ordersSubmit(){console.log(this.idCart),console.log(this.orders.value),this._OrdersService.checkOut(this.idCart,this.orders.value).subscribe({next:e=>{console.log(e),e.status=="success"&&window.open(e.session.url,"_self")},error:e=>{console.log(e)}})}static \u0275fac=function(i){return new(i||n)};static \u0275cmp=c({type:n,selectors:[["app-order"]],standalone:!0,features:[f],decls:15,vars:1,consts:[[1,"order","my-5","w-100"],[1,"container"],[1,"row"],[1,"col-md-6","d-grid","m-auto"],[1,"fw-bold","text-center","mt-5"],[1,"p-4","rounded-4","shadow","my-5",3,"ngSubmit","formGroup"],[1,"m-1"],["formControlName","details","type","text","placeholder","Details",1,"form-control"],["formControlName","phone","type","tel","placeholder","Phone ",1,"form-control"],["formControlName","city","type","text","placeholder","city",1,"form-control"],["type","submit",1,"btn-den","mt-3"]],template:function(i,s){i&1&&(t(0,"section",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"h1",4),a(5,"Shipping Address"),o(),t(6,"form",5),p("ngSubmit",function(){return s.ordersSubmit()}),t(7,"div",6),l(8,"input",7),o(),t(9,"div",6),l(10,"input",8),o(),t(11,"div",6),l(12,"input",9),o(),t(13,"button",10),a(14,"Check out"),o()()()()()()),i&2&&(m(6),u("formGroup",s.orders))},dependencies:[O,C,b,h,v,S,_],styles:['.order[_ngcontent-%COMP%]{background-image:url("./media/high-4W4KVOOY.jpg");background-position:center;background-repeat:no-repeat;background-size:cover;height:100vh}.btn-den[_ngcontent-%COMP%]{background-color:#20b9b9;padding:7px 20px;border:1px solid #ccc;border-radius:5px;color:#fff;cursor:pointer;transition:background-color .5s}.btn-den[_ngcontent-%COMP%]:hover{background-color:#1b8181;color:#fff}']})}return n})();export{G as OrderComponent};
