@REM ^ is used for new line
asciidoctor --backend docbook --out-file - participant3.adoc | ^
pandoc --from docbook --to docx --output build/participant3.docx