// Varying Variables
varying vec3 V_Normal_WCS;
varying vec3 V_Position_WCS;

// Uniform Variables
uniform samplerCube cubemapUniform;
uniform sampler2D textureUniform;

void main() {

	// Calculate view ray direction, reflected view ray direction, and grab appropriate texel reflected view ray points to
	// NOTE: cameraPosition is available to all fragment shaders by default, value is camera position in WCS
	vec3 I = normalize(V_Position_WCS - cameraPosition);
	// vec3 R = reflect(I, normalize(V_Normal_WCS));
    float eta = 0.8;
    vec3 R = refract(I, normalize(V_Normal_WCS), eta);

	vec4 fragColor = textureCube(cubemapUniform, R);
    gl_FragColor = fragColor;
}
