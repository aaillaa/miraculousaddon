export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const cors = { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json; charset=utf-8" };

        if (url.pathname === "/manifest.json") {
            return new Response(JSON.stringify({
                id: "org.cnbr.miraculous",
                version: "1.0.0",
                name: "CNBR Miraculous",
                description: "Add-on para assistir Miraculous em tempo real pelo Chat Noir Brasil",
                resources: ["stream"],
                types: ["series"],
                idPrefixes: ["tt"],
                catalogs: []
            }), { headers: cors });
        }

        if (url.pathname.startsWith("/stream/series/")) {
            const parts = url.pathname.replace("/stream/series/", "").replace(".json", "").split("/");
            const s = parts[1] || "1";
            const e = parts[2] || "1";

            return new Response(JSON.stringify({
                streams: [
                    {
                        name: "CNBR Player",
                        title: `Temporada ${s} • Episódio ${e} (Chat Noir Brasil)`,
                        url: `https://cnbr.space/embed/${s}/${e}`
                    }
                ]
            }), { headers: cors });
        }

        return new Response("Add-on CNBR Ativo e Funcionando!", { headers: { "Content-Type": "text/plain; charset=utf-8" } });
    }
};
