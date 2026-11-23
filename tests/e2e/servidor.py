# Serve out/ como o `python3 -m http.server PORTA -d out`, mas com a fila de conexões maior. Com a fila padrão (5),
# o Chrome abre muitas conexões de uma vez e algumas voltam com ERR_CONNECTION_RESET: um script da página não carrega
# e o teste falha ao acaso (5 em 15 cargas sem WebGL, medido em 2026-11-23; 0 em 15 com a fila em 128).
import functools
import http.server
import socket
import sys


class Servidor(http.server.ThreadingHTTPServer):
    request_queue_size = 128
    address_family = socket.AF_INET6

    def server_bind(self):
        # IPv6 e IPv4 no mesmo socket: localhost pode resolver para ::1 ou para 127.0.0.1.
        self.socket.setsockopt(socket.IPPROTO_IPV6, socket.IPV6_V6ONLY, 0)
        super().server_bind()


class Arquivos(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass  # sem uma linha por pedido na saída dos testes


Servidor(('::', int(sys.argv[1])), functools.partial(Arquivos, directory='out')).serve_forever()
