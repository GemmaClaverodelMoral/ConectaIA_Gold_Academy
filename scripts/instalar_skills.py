import os
import shutil

SOURCE_DIR = r"c:\Informatica\Proyectos\landing_vcl\.tmp\superpowers\skills"
TARGET_DIR = r"c:\Informatica\Proyectos\landing_vcl\.agent\skills"

def install_skills():
    if not os.path.exists(SOURCE_DIR):
        print(f"Error: No se encontró la carpeta fuente en {SOURCE_DIR}")
        return

    if not os.path.exists(TARGET_DIR):
        os.makedirs(TARGET_DIR)
        print(f"Creado directorio: {TARGET_DIR}")

    source_skills = [d for d in os.listdir(SOURCE_DIR) if os.path.isdir(os.path.join(SOURCE_DIR, d))]
    target_skills = [d for d in os.listdir(TARGET_DIR) if os.path.isdir(os.path.join(TARGET_DIR, d))]

    installed = []
    skipped = []

    for skill in source_skills:
        if skill not in target_skills:
            src = os.path.join(SOURCE_DIR, skill)
            dst = os.path.join(TARGET_DIR, skill)
            try:
                shutil.copytree(src, dst)
                installed.append(skill)
            except Exception as e:
                print(f"Error al instalar {skill}: {e}")
        else:
            skipped.append(skill)

    print("\nREPORTE DE INSTALACION")
    print("-" * 30)
    if installed:
        print("Installed skills:", ", ".join(installed))
    else:
        print("No se instaló ninguna skill nueva.")
    
    if skipped:
        print("Skills ya existentes (no instaladas):", ", ".join(skipped))
    print("-" * 30)

if __name__ == "__main__":
    install_skills()
