# NODEJS CLEAN ARCHITECTURE


## Configurações de Dependencias

~~~yml
    Primeiro: npm i standard -D
        descrição: Usa o padrão do java script standard style. 
        Sem ponto e vírgula no final da sentença
        Sem virgula sobrando. Aspas simples.
    
    Segundo: npm i lint-staged -D
        descrição: permite que rode script na área de staged.
        Rodar arquivos somente que estão na área de staged.
        É possível fazer validação de arquivos que vão entrar no commit.
        Toda vez que fizer um git add . eles vão para o staged, e nisso 
        é possível aplicar validações. 
        fix == o standard vai tentar corrigir e logo em seguida fazer um commit.
        config: {
            "lint-staged":{
                "*.js": ["standard --fix", "git add"]
            },
        }
        Execução: npx lint-staged

    Terceiro: npm i husky@4.3 -D
        descrição: permite adicionar hooks no git. Rodar um script antes que acontece um script.
        Vai fazer com que o commit fique travado conforme a configuração do lint-staged.
        husky: {
            hooks: {
                pre-commit: "lint-staged"
            }
        }
    
    Quarto: npm i jest -D
        descrição: framework para testes unitários, integração, etc.
        config: 
         windows: |
            npm install -g jest;
            Set-ExecutionPolicy RemoteSigned
            jest --init
        

~~~
