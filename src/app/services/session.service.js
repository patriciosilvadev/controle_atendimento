/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
	'use strict';
	angular.module('BlurAdmin').service('Session', function () {
		this.create = function (usuario_id, tipo,username,token,nome) {
			this.usuario_id = usuario_id;
			this.tipo = tipo;
			this.username=username;
			this.token=token;
			this.nome=nome;
		};
		this.destroy = function () {
			this.usuario_id = null;
			this.tipo = null;
			this.username=null;
			this.token=null;
			this.nome=null;
		};
	});
})();